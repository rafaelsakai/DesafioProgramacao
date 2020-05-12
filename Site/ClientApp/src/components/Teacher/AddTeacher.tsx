import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { TeacherData } from './ListTeacher';  

class SubjectSelectOption {
   id: number = 0;
   name: string = "";
}

interface AddTeacherDataState {
   title: string;
   loading: boolean;
   subjects: Array<any>;
   subjectsToAdd: Array<any>;
   subjectAddSelected: SubjectSelectOption;
   subjectAddedSelected: SubjectSelectOption;
   teacherData: TeacherData;
}

export class AddTeacher extends React.Component<RouteComponentProps<{}>, AddTeacherDataState> {
   constructor(props) {
      super(props);

      this.state = {
         title: "Incluir Professor",
         loading: false,
         subjects: [],
         subjectsToAdd: [],
         subjectAddSelected: new SubjectSelectOption(),
         subjectAddedSelected: new SubjectSelectOption(),
         teacherData: new TeacherData()
      };

      let id = this.props.match.params["id"];

      // This will set state for Edit employee
      if (id > 0) {
         fetch('Teacher/Get/' + id)
            .then(response => response.json() as Promise<TeacherData>)
            .then(data => {
               this.setState({ title: "Editar Professor", loading: false, subjects: data.subjects, teacherData: data });

               fetch('Subject/GetAll', {
                  headers: {
                     'Content-Type': 'application/json'
                  }
               }).then(response => response.json() as Promise<Array<any>>)
                  .then(data => {
                     this.setState({ subjectsToAdd: data });
                     if (this.state.subjects.length > 0) {
                        let filteredArray = this.state.subjectsToAdd.filter(item =>
                           !this.state.subjects.some(s => s.id == item.id))

                        this.setState({ subjectsToAdd: filteredArray });
                     }
                  });
            });
      }
      else {
         fetch('Subject/GetAll', {
            headers: {
               'Content-Type': 'application/json'
            }
         }).then(response => response.json() as Promise<Array<any>>)
            .then(data => {
               this.setState({ subjectsToAdd: data });
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

      object["subjects"] = this.state.subjects;

      let json = JSON.stringify(object);

      if (this.state.teacherData.id > 0) {
         fetch('Teacher/Edit', {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json'
            },
            body: json
         }).then((response) => {
            this.props.history.push("/professor/lista");
         });

      }
      else {
         fetch('Teacher/Add', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: json
         }).then((response) => {
            this.props.history.push("/professor/lista");
         });

      }
   }
   // This will handle Cancel button click event.  
   private handleCancel(e) {
      e.preventDefault();
      this.props.history.push("/professor/lista");
   }

   private subjectAddHandleChange(e) {
      if (e.target.value > 0) {
         const obj = { id: e.target.value, name: e.target.options[e.target.selectedIndex].text };
         this.setState({ subjectAddSelected: obj });
      }
   }

   private subjectAddedHandleChange(e) {
      if (e.target.value > 0) {
         const obj = { id: e.target.value, name: e.target.options[e.target.selectedIndex].text };
         this.setState({ subjectAddedSelected: obj });
      }
   }

   private addSubject(e) {
      if (this.state.subjectAddSelected.id > 0) {

         let filteredArray = this.state.subjectsToAdd.filter(item => item.id != this.state.subjectAddSelected.id)
         this.setState({ subjectsToAdd: filteredArray });
         this.state.subjects.push(this.state.subjectAddSelected);
         this.setState({ subjectAddSelected: new SubjectSelectOption() });
         this.renderSubjectsToAdd();
         this.renderSubjectsAdded();
      }
   }

   private removeSubject(e) {
      if (this.state.subjectAddedSelected.id > 0) {
         let filteredArray = this.state.subjects.filter(item => item.id != this.state.subjectAddedSelected.id)
         this.setState({ subjects: filteredArray });
         this.state.subjectsToAdd.push(this.state.subjectAddedSelected);
         this.setState({ subjectAddedSelected: new SubjectSelectOption() });
         this.renderSubjectsToAdd();
         this.renderSubjectsAdded();
      }
   }

   private renderSubjectsToAdd() {
      return (  
         this.state.subjectsToAdd.map(subject => 
            <option key={subject.id} value={subject.id}>{subject.name}</option>
         )
      );
   }

   private renderSubjectsAdded() {
      return (
         this.state.subjects.map(subject =>
            <option key={subject.id} value={subject.id}>{subject.name}</option>
         )
      );
   }

   // Returns the HTML Form to the render() method.  
   private renderCreateForm() {
      return (
         <form onSubmit={this.handleSave} >
            <div className="form-group row" >
               <input type="hidden" name="Id" value={this.state.teacherData.id} />
            </div>
            < div className="form-group row" >
               <label className=" control-label col-md-12" htmlFor="Name">Nome</label>
               <div className="col-md-4">
                  <input className="form-control" type="text" name="Name" defaultValue={this.state.teacherData.name} required />
               </div>
            </div >
            <div className="form-group row">
               <label className="control-label col-md-12" htmlFor="Subject">Matérias Disponíveis</label>
               <div className="input-group col-md-4">
                  <select className="custom-select" name="SubjectsToAdd" onChange={this.subjectAddHandleChange.bind(this)}>
                     <option value="">Selecione uma matéria</option>   
                     {this.renderSubjectsToAdd()}
                  </select>
                  <div className="input-group-append">
                     <button className="btn btn-outline-secondary" type="button"
                        onClick={this.addSubject.bind(this)}>Adicionar</button>
                  </div>
               </div>
            </div >
            <div className="form-group row">
               <label className="control-label col-md-12" htmlFor="Subject">Matérias Lecionando</label>
               <div className="input-group col-md-4">
                  <select className="custom-select" data-val="true" name="SubjectsAdded" size={5}
                     onChange={this.subjectAddedHandleChange.bind(this)}>
                     required>
                     {this.renderSubjectsAdded()}
                  </select>
                  <div >
                     <button className="btn btn-outline-secondary" type="button"
                        onClick={this.removeSubject.bind(this)}>Remover</button>
                  </div>
               </div>
            </div >
            <div className="form-group">
               <button type="submit" className="btn btn-primary">{this.state.teacherData.id > 0 ? "Editar" : "Incluir"}</button>
               <button className="btn btn-secondary" onClick={this.handleCancel}>Cancelar</button>
            </div >
         </form >
      )
   }
}