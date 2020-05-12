import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';

export class ListSubject extends React.Component<RouteComponentProps<{}>, { Subjects: SubjectData[], loading: boolean }> {
   constructor(props) {
      super(props);
      this.state = { Subjects: [], loading: true };
   }

   componentDidMount() {
      this.populateSubjectData();
   }

   render() {
      let contents = this.state.loading
         ? <p><em>Carregando...</em></p>
         : this.renderSubjectTable(this.state.Subjects);

      return (
         <div>
            <h1 id="tabelLabel">Matérias</h1>
            <p>
               <Link className="btn btn-primary" to="/materia/incluir">Incluir</Link>
            </p>
            {contents}
         </div>
      );
   }

   private handleDelete(id: number) {
      if (!window.confirm("Você deseja excluir a matéria Id: " + id))
         return;
      else {
         fetch('Subject/Delete/' + id, {
            method: 'delete'
         }).then(data => {
            this.setState(
               {
                  Subjects: this.state.Subjects.filter((rec) => {
                     return (rec.id != id);
                  })
               });
         });
      }
   }

   private handleEdit(id: number) {
      this.props.history.push("/materia/editar/" + id);
   }

   private renderSubjectTable(Subjects) {
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
               {Subjects.map(subject =>
                  <tr key={subject.id}>
                     <td>{subject.id}</td>
                     <td>{subject.name}</td>
                     <td>
                        <a className="a-href badge badge-primary" onClick={(id) => this.handleEdit(subject.id)}>Editar</a>&nbsp;|&nbsp;
                        <a className="a-href badge badge-secondary" onClick={(id) => this.handleDelete(subject.id)}>Excluir</a>
                     </td>
                  </tr>
               )}
            </tbody>
         </table>
      );
   }

   async populateSubjectData() {
      const response = await fetch('Subject/GetAll');
      const data = await response.json();
      this.setState({ Subjects: data, loading: false });
   }
}

export class SubjectData {
   id: number = 0;
   name: string = "";
   teachers: Array<any> = [];
}
