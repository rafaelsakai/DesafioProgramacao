"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ListSubject_1 = require("./ListSubject");
var TeacherSelectOption = /** @class */ (function () {
    function TeacherSelectOption() {
        this.id = 0;
        this.name = "";
    }
    return TeacherSelectOption;
}());
var AddSubject = /** @class */ (function (_super) {
    __extends(AddSubject, _super);
    function AddSubject(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            title: "Incluir Matéria",
            loading: false,
            teachers: [],
            teachersToAdd: [],
            teacherAddSelected: new TeacherSelectOption(),
            teacherAddedSelected: new TeacherSelectOption(),
            subjectData: new ListSubject_1.SubjectData()
        };
        var id = _this.props.match.params["id"];
        // This will set state for Edit employee
        if (id > 0) {
            fetch('Subject/Get/' + id)
                .then(function (response) { return response.json(); })
                .then(function (data) {
                _this.setState({ title: "Editar Matéria", loading: false, teachers: data.teachers, subjectData: data });
                fetch('Teacher/GetAll', {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(function (response) { return response.json(); })
                    .then(function (data) {
                    _this.setState({ teachersToAdd: data });
                    if (_this.state.teachers.length > 0) {
                        var filteredArray = _this.state.teachersToAdd.filter(function (item) {
                            return !_this.state.teachers.some(function (s) { return s.id == item.id; });
                        });
                        _this.setState({ teachersToAdd: filteredArray });
                    }
                });
            });
        }
        else {
            fetch('Teacher/GetAll', {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (response) { return response.json(); })
                .then(function (data) {
                _this.setState({ teachersToAdd: data });
            });
        }
        // This binding is necessary to make "this" work in the callback  
        _this.handleSave = _this.handleSave.bind(_this);
        _this.handleCancel = _this.handleCancel.bind(_this);
        return _this;
    }
    AddSubject.prototype.render = function () {
        var contents = this.state.loading
            ? React.createElement("p", null,
                React.createElement("em", null, "Carregando..."))
            : this.renderCreateForm();
        return React.createElement("div", null,
            React.createElement("h3", null, this.state.title),
            React.createElement("hr", null),
            contents);
    };
    // This will handle the submit form event.  
    AddSubject.prototype.handleSave = function (event) {
        var _this = this;
        event.preventDefault();
        var formData = new FormData(event.target);
        var object = {};
        formData.forEach(function (value, key) {
            object[key] = value;
        });
        object["Teachers"] = this.state.teachers;
        var json = JSON.stringify(object);
        if (this.state.subjectData.id > 0) {
            fetch('Subject/Edit', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: json
            }).then(function (response) {
                _this.props.history.push("/materia/lista");
            });
        }
        else {
            fetch('Subject/Add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: json
            }).then(function (response) {
                _this.props.history.push("/materia/lista");
            });
        }
    };
    // This will handle Cancel button click event.  
    AddSubject.prototype.handleCancel = function (e) {
        e.preventDefault();
        this.props.history.push("/materia/lista");
    };
    AddSubject.prototype.TeacherAddHandleChange = function (e) {
        if (e.target.value > 0) {
            var obj = { id: e.target.value, name: e.target.options[e.target.selectedIndex].text };
            this.setState({ teacherAddSelected: obj });
        }
    };
    AddSubject.prototype.TeacherAddedHandleChange = function (e) {
        if (e.target.value > 0) {
            var obj = { id: e.target.value, name: e.target.options[e.target.selectedIndex].text };
            this.setState({ teacherAddedSelected: obj });
        }
    };
    AddSubject.prototype.addTeacher = function (e) {
        var _this = this;
        if (this.state.teacherAddSelected.id > 0) {
            var filteredArray = this.state.teachersToAdd.filter(function (item) { return item.id != _this.state.teacherAddSelected.id; });
            this.setState({ teachersToAdd: filteredArray });
            this.state.teachers.push(this.state.teacherAddSelected);
            this.setState({ teacherAddSelected: new TeacherSelectOption() });
            this.renderTeachersToAdd();
            this.renderTeachersAdded();
        }
    };
    AddSubject.prototype.removeTeacher = function (e) {
        var _this = this;
        if (this.state.teacherAddedSelected.id > 0) {
            var filteredArray = this.state.teachers.filter(function (item) { return item.id != _this.state.teacherAddedSelected.id; });
            this.setState({ teachers: filteredArray });
            this.state.teachersToAdd.push(this.state.teacherAddedSelected);
            this.setState({ teacherAddedSelected: new TeacherSelectOption() });
            this.renderTeachersToAdd();
            this.renderTeachersAdded();
        }
    };
    AddSubject.prototype.renderTeachersToAdd = function () {
        return (this.state.teachersToAdd.map(function (Teacher) {
            return React.createElement("option", { key: Teacher.id, value: Teacher.id }, Teacher.name);
        }));
    };
    AddSubject.prototype.renderTeachersAdded = function () {
        return (this.state.teachers.map(function (Teacher) {
            return React.createElement("option", { key: Teacher.id, value: Teacher.id }, Teacher.name);
        }));
    };
    // Returns the HTML Form to the render() method.  
    AddSubject.prototype.renderCreateForm = function () {
        return (React.createElement("form", { onSubmit: this.handleSave },
            React.createElement("div", { className: "form-group row" },
                React.createElement("input", { type: "hidden", name: "Id", value: this.state.subjectData.id })),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: " control-label col-md-12", htmlFor: "Name" }, "Nome"),
                React.createElement("div", { className: "col-md-4" },
                    React.createElement("input", { className: "form-control", type: "text", name: "Name", defaultValue: this.state.subjectData.name, required: true }))),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: "control-label col-md-12", htmlFor: "Teacher" }, "Professores Dispon\u00EDveis"),
                React.createElement("div", { className: "input-group col-md-4" },
                    React.createElement("select", { className: "custom-select", name: "TeachersToAdd", onChange: this.TeacherAddHandleChange.bind(this) },
                        React.createElement("option", { value: "" }, "Selecione uma mat\u00E9ria"),
                        this.renderTeachersToAdd()),
                    React.createElement("div", { className: "input-group-append" },
                        React.createElement("button", { className: "btn btn-outline-secondary", type: "button", onClick: this.addTeacher.bind(this) }, "Adicionar")))),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: "control-label col-md-12", htmlFor: "Teacher" }, "Professores Lecionando"),
                React.createElement("div", { className: "input-group col-md-4" },
                    React.createElement("select", { className: "custom-select", "data-val": "true", name: "TeachersAdded", size: 5, onChange: this.TeacherAddedHandleChange.bind(this) },
                        "required>",
                        this.renderTeachersAdded()),
                    React.createElement("div", null,
                        React.createElement("button", { className: "btn btn-outline-secondary", type: "button", onClick: this.removeTeacher.bind(this) }, "Remover")))),
            React.createElement("div", { className: "form-group" },
                React.createElement("button", { type: "submit", className: "btn btn-primary" }, this.state.subjectData.id > 0 ? "Editar" : "Incluir"),
                React.createElement("button", { className: "btn btn-secondary", onClick: this.handleCancel }, "Cancelar"))));
    };
    return AddSubject;
}(React.Component));
exports.AddSubject = AddSubject;
//# sourceMappingURL=AddSubject.js.map