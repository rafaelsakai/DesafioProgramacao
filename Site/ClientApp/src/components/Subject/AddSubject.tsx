import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { SubjectData } from './ListSubject';

class TeacherSelectOption {
   id: number = 0;
   name: string = "";
}

interface AddSubjectDataState {
   title: string;
   loading: boolean;
   teachers: Array<any>;
   teachersToAdd: Array<any>;
   teacherAddSelected: TeacherSelectOption;
   teacherAddedSelected: TeacherSelectOption;
   subjectData: SubjectData;
}

export class AddSubject extends React.Component<RouteComponentProps<{}>, AddSubjectDataState> {
   constructor(props) {
      super(props);

      this.state = {
         title: "Incluir Matéria",
         loading: false,
         teachers: [],
         teachersToAdd: [],
         teacherAddSelected: new TeacherSelectOption(),
         teacherAddedSelected: new TeacherSelectOption(),
         subjectData: new SubjectData()
      };

      let id = this.props.match.params["id"];

      // This will set state for Edit employee
      if (id > 0) {
         fetch('Subject/Get/' + id)
            .then(response => response.json() as Promise<SubjectData>)
            .then(data => {
               this.setState({ title: "Editar Matéria", loading: false, teachers: data.teachers, subjectData: data });

               fetch('Teacher/GetAll', {
                  headers: {
                     'Content-Type': 'application/json'
                  }
               }).then(response => response.json() as Promise<Array<any>>)
                  .then(data => {
                     this.setState({ teachersToAdd: data });
                     if (this.state.teachers.length > 0) {
                        let filteredArray = this.state.teachersToAdd.filter(item =>
                           !this.state.teachers.some(s => s.id == item.id))

                        this.setState({ teachersToAdd: filteredArray });
                     }
                  });
            });
      }
      else {
         fetch('Teacher/GetAll', {
            headers: {
               'Content-Type': 'application/json'
            }
         }).then(response => response.json() as Promise<Array<any>>)
            .then(data => {
               this.setState({ teachersToAdd: data });
            });
      }

      // This binding is necessary to make "this" work in the callback  
      this.handleSave = this.handleSave.bind(this);
      this.handleCancel = this.handleCancel.bind(this);
   }
   public render() {
      let contents = this.state.loading
         ? <p><em>Carregando...</em></p>
         : this.renderCreateForm();
      return <div>
         <h3>{this.state.title}</h3>
         <hr />
         {contents}
      </div>;
   }
   // This will handle the submit form event.  
   private handleSave(event) {
      event.preventDefault();

      const formData = new FormData(event.target);
      let object = {};

      formData.forEach(function (value, key) {
         object[key] = value;
      });

      object["Teachers"] = this.state.teachers;

      let json = JSON.stringify(object);

      if (this.state.subjectData.id > 0) {
         fetch('Subject/Edit', {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json'
            },
            body: json
         }).then((response) => {
            this.props.history.push("/materia/lista");
         });

      }
      else {
         fetch('Subject/Add', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: json
         }).then((response) => {
            this.props.history.push("/materia/lista");
         });

      }
   }
   // This will handle Cancel button click event.  
   private handleCancel(e) {
      e.preventDefault();
      this.props.history.push("/materia/lista");
   }

   private TeacherAddHandleChange(e) {
      if (e.target.value > 0) {
         const obj = { id: e.target.value, name: e.target.options[e.target.selectedIndex].text };
         this.setState({ teacherAddSelected: obj });
      }
   }

   private TeacherAddedHandleChange(e) {
      if (e.target.value > 0) {
         const obj = { id: e.target.value, name: e.target.options[e.target.selectedIndex].text };
         this.setState({ teacherAddedSelected: obj });
      }
   }

   private addTeacher(e) {
      if (this.state.teacherAddSelected.id > 0) {
         let filteredArray = this.state.teachersToAdd.filter(item => item.id != this.state.teacherAddSelected.id)
         this.setState({ teachersToAdd: filteredArray });
         this.state.teachers.push(this.state.teacherAddSelected);
         this.setState({ teacherAddSelected: new TeacherSelectOption() });
         this.renderTeachersToAdd();
         this.renderTeachersAdded();
      }
   }

   private removeTeacher(e) {
      if (this.state.teacherAddedSelected.id > 0) {
         let filteredArray = this.state.teachers.filter(item => item.id != this.state.teacherAddedSelected.id)
         this.setState({ teachers: filteredArray });
         this.state.teachersToAdd.push(this.state.teacherAddedSelected);
         this.setState({ teacherAddedSelected: new TeacherSelectOption() });
         this.renderTeachersToAdd();
         this.renderTeachersAdded();
      }
   }

   private renderTeachersToAdd() {
      return (
         this.state.teachersToAdd.map(Teacher =>
            <option key={Teacher.id} value={Teacher.id}>{Teacher.name}</option>
         )
      );
   }

   private renderTeachersAdded() {
      return (
         this.state.teachers.map(Teacher =>
            <option key={Teacher.id} value={Teacher.id}>{Teacher.name}</option>
         )
      );
   }

   // Returns the HTML Form to the render() method.  
   private renderCreateForm() {
      return (
         <form onSubmit={this.handleSave} >
            <div className="form-group row" >
               <input type="hidden" name="Id" value={this.state.subjectData.id} />
            </div>
            < div className="form-group row" >
               <label className=" control-label col-md-12" htmlFor="Name">Nome</label>
               <div className="col-md-4">
                  <input className="form-control" type="text" name="Name" defaultValue={this.state.subjectData.name} required />
               </div>
            </div >
            <div className="form-group row">
               <label className="control-label col-md-12" htmlFor="Teacher">Professores Disponíveis</label>
               <div className="input-group col-md-4">
                  <select className="custom-select" name="TeachersToAdd" onChange={this.TeacherAddHandleChange.bind(this)}>
                     <option value="">Selecione uma matéria</option>
                     {this.renderTeachersToAdd()}
                  </select>
                  <div className="input-group-append">
                     <button className="btn btn-outline-secondary" type="button"
                        onClick={this.addTeacher.bind(this)}>Adicionar</button>
                  </div>
               </div>
            </div >
            <div className="form-group row">
               <label className="control-label col-md-12" htmlFor="Teacher">Professores Lecionando</label>
               <div className="input-group col-md-4">
                  <select className="custom-select" data-val="true" name="TeachersAdded" size={5}
                     onChange={this.TeacherAddedHandleChange.bind(this)}>
                     required>
                     {this.renderTeachersAdded()}
                  </select>
                  <div >
                     <button className="btn btn-outline-secondary" type="button"
                        onClick={this.removeTeacher.bind(this)}>Remover</button>
                  </div>
               </div>
            </div >
            <div className="form-group">
               <button type="submit" className="btn btn-primary">{this.state.subjectData.id > 0 ? "Editar" : "Incluir"}</button>
               <button className="btn btn-secondary" onClick={this.handleCancel}>Cancelar</button>
            </div >
         </form >
      )
   }
}