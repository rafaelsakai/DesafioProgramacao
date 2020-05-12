import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';  

export class ListTeacher extends React.Component<RouteComponentProps<{}>, { teachers: TeacherData[], loading: boolean }> {
   constructor(props) {
      super(props);
      this.state = { teachers: [], loading: true };
   }

   componentDidMount() {
      this.populateTeacherData();
   }

   render() {
      let contents = this.state.loading
         ? <p><em>Carregando...</em></p>
         : this.renderTeacherTable(this.state.teachers);

      return (
         <div>
            <h1 id="tabelLabel">Professores</h1>
            <p>
               <Link className="btn btn-primary" to="/professor/incluir">Incluir</Link>
            </p>
            {contents}
         </div>
      );
   }

   private handleDelete(id: number) {
      if (!window.confirm("Você deseja excluir o professor Id: " + id))
         return;
      else {
         fetch('Teacher/Delete/' + id, {
            method: 'delete'
         }).then(data => {
            this.setState(
               {
                  teachers: this.state.teachers.filter((rec) => {
                     return (rec.id != id);
                  })
               });
         });
      }
   }

   private handleEdit(id: number) {
      this.props.history.push("/professor/editar/" + id);
   } 

   private renderTeacherTable(teachers) {
      return (
         <table className='table table-striped' aria-labelledby="tabelLabel">
            <thead>
               <tr>
                  <th>Id</th>
                  <th>Nome</th>
                  <th></th>
               </tr>
            </thead>
            <tbody>
               {teachers.map(teacher =>
                  <tr key={teacher.id}>
                     <td>{teacher.id}</td>
                     <td>{teacher.name}</td>
                     <td>
                        <a className="a-href badge badge-primary" onClick={(id) => this.handleEdit(teacher.id)}>Editar</a>&nbsp;|&nbsp; 
                        <a className="a-href badge badge-secondary" onClick={(id) => this.handleDelete(teacher.id)}>Excluir</a>
                     </td>
                  </tr>
               )}
            </tbody>
         </table>
      );
   }

   async populateTeacherData() {
      const response = await fetch('Teacher/GetAll');
      const data = await response.json();
      this.setState({ teachers: data, loading: false });
   }
}

export class TeacherData {
   id: number = 0;
   name: string = "";
   subjects: Array<any> = [];
}
