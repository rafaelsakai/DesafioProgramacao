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
var ListTeacher_1 = require("./ListTeacher");
var SubjectSelectOption = /** @class */ (function () {
    function SubjectSelectOption() {
        this.id = 0;
        this.name = "";
    }
    return SubjectSelectOption;
}());
var AddTeacher = /** @class */ (function (_super) {
    __extends(AddTeacher, _super);
    function AddTeacher(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            title: "Incluir Professor",
            loading: false,
            subjects: [],
            subjectsToAdd: [],
            subjectAddSelected: new SubjectSelectOption(),
            subjectAddedSelected: new SubjectSelectOption(),
            teacherData: new ListTeacher_1.TeacherData()
        };
        var id = _this.props.match.params["id"];
        // This will set state for Edit employee
        if (id > 0) {
            fetch('Teacher/Get/' + id)
                .then(function (response) { return response.json(); })
                .then(function (data) {
                _this.setState({ title: "Editar Professor", loading: false, subjects: data.subjects, teacherData: data });
                fetch('Subject/GetAll', {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(function (response) { return response.json(); })
                    .then(function (data) {
                    _this.setState({ subjectsToAdd: data });
                    if (_this.state.subjects.length > 0) {
                        var filteredArray = _this.state.subjectsToAdd.filter(function (item) {
                            return !_this.state.subjects.some(function (s) { return s.id == item.id; });
                        });
                        _this.setState({ subjectsToAdd: filteredArray });
                    }
                });
            });
        }
        else {
            fetch('Subject/GetAll', {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (response) { return response.json(); })
                .then(function (data) {
                _this.setState({ subjectsToAdd: data });
            });
        }
        // This binding is necessary to make "this" work in the callback  
        _this.handleSave = _this.handleSave.bind(_this);
        _this.handleCancel = _this.handleCancel.bind(_this);
        return _this;
    }
    AddTeacher.prototype.render = function () {
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
    AddTeacher.prototype.handleSave = function (event) {
        var _this = this;
        event.preventDefault();
        var formData = new FormData(event.target);
        var object = {};
        formData.forEach(function (value, key) {
            object[key] = value;
        });
        object["subjects"] = this.state.subjects;
        var json = JSON.stringify(object);
        if (this.state.teacherData.id > 0) {
            fetch('Teacher/Edit', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: json
            }).then(function (response) {
                _this.props.history.push("/professor/lista");
            });
        }
        else {
            fetch('Teacher/Add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: json
            }).then(function (response) {
                _this.props.history.push("/professor/lista");
            });
        }
    };
    // This will handle Cancel button click event.  
    AddTeacher.prototype.handleCancel = function (e) {
        e.preventDefault();
        this.props.history.push("/professor/lista");
    };
    AddTeacher.prototype.subjectAddHandleChange = function (e) {
        if (e.target.value > 0) {
            var obj = { id: e.target.value, name: e.target.options[e.target.selectedIndex].text };
            this.setState({ subjectAddSelected: obj });
        }
    };
    AddTeacher.prototype.subjectAddedHandleChange = function (e) {
        if (e.target.value > 0) {
            var obj = { id: e.target.value, name: e.target.options[e.target.selectedIndex].text };
            this.setState({ subjectAddedSelected: obj });
        }
    };
    AddTeacher.prototype.addSubject = function (e) {
        var _this = this;
        if (this.state.subjectAddSelected.id > 0) {
            var filteredArray = this.state.subjectsToAdd.filter(function (item) { return item.id != _this.state.subjectAddSelected.id; });
            this.setState({ subjectsToAdd: filteredArray });
            this.state.subjects.push(this.state.subjectAddSelected);
            this.setState({ subjectAddSelected: new SubjectSelectOption() });
            this.renderSubjectsToAdd();
            this.renderSubjectsAdded();
        }
    };
    AddTeacher.prototype.removeSubject = function (e) {
        var _this = this;
        if (this.state.subjectAddedSelected.id > 0) {
            var filteredArray = this.state.subjects.filter(function (item) { return item.id != _this.state.subjectAddedSelected.id; });
            this.setState({ subjects: filteredArray });
            this.state.subjectsToAdd.push(this.state.subjectAddedSelected);
            this.setState({ subjectAddedSelected: new SubjectSelectOption() });
            this.renderSubjectsToAdd();
            this.renderSubjectsAdded();
        }
    };
    AddTeacher.prototype.renderSubjectsToAdd = function () {
        return (this.state.subjectsToAdd.map(function (subject) {
            return React.createElement("option", { key: subject.id, value: subject.id }, subject.name);
        }));
    };
    AddTeacher.prototype.renderSubjectsAdded = function () {
        return (this.state.subjects.map(function (subject) {
            return React.createElement("option", { key: subject.id, value: subject.id }, subject.name);
        }));
    };
    // Returns the HTML Form to the render() method.  
    AddTeacher.prototype.renderCreateForm = function () {
        return (React.createElement("form", { onSubmit: this.handleSave },
            React.createElement("div", { className: "form-group row" },
                React.createElement("input", { type: "hidden", name: "Id", value: this.state.teacherData.id })),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: " control-label col-md-12", htmlFor: "Name" }, "Nome"),
                React.createElement("div", { className: "col-md-4" },
                    React.createElement("input", { className: "form-control", type: "text", name: "Name", defaultValue: this.state.teacherData.name, required: true }))),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: "control-label col-md-12", htmlFor: "Subject" }, "Mat\u00E9rias Dispon\u00EDveis"),
                React.createElement("div", { className: "input-group col-md-4" },
                    React.createElement("select", { className: "custom-select", name: "SubjectsToAdd", onChange: this.subjectAddHandleChange.bind(this) },
                        React.createElement("option", { value: "" }, "Selecione uma mat\u00E9ria"),
                        this.renderSubjectsToAdd()),
                    React.createElement("div", { className: "input-group-append" },
                        React.createElement("button", { className: "btn btn-outline-secondary", type: "button", onClick: this.addSubject.bind(this) }, "Adicionar")))),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: "control-label col-md-12", htmlFor: "Subject" }, "Mat\u00E9rias Lecionando"),
                React.createElement("div", { className: "input-group col-md-4" },
                    React.createElement("select", { className: "custom-select", "data-val": "true", name: "SubjectsAdded", size: 5, onChange: this.subjectAddedHandleChange.bind(this) },
                        "required>",
                        this.renderSubjectsAdded()),
                    React.createElement("div", null,
                        React.createElement("button", { className: "btn btn-outline-secondary", type: "button", onClick: this.removeSubject.bind(this) }, "Remover")))),
            React.createElement("div", { className: "form-group" },
                React.createElement("button", { type: "submit", className: "btn btn-primary" }, this.state.teacherData.id > 0 ? "Editar" : "Incluir"),
                React.createElement("button", { className: "btn btn-secondary", onClick: this.handleCancel }, "Cancelar"))));
    };
    return AddTeacher;
}(React.Component));
exports.AddTeacher = AddTeacher;
//# sourceMappingURL=AddTeacher.js.map