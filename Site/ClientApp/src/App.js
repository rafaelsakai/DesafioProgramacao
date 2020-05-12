import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { ListTeacher } from './components/Teacher/ListTeacher';
import { AddTeacher } from './components/Teacher/AddTeacher'; 
import { ListSubject } from './components/Subject/ListSubject';
import { AddSubject } from './components/Subject/AddSubject'; 

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
       <Layout>
          <Route exact path='/' component={Home} />
          <Route path='/professor/lista' component={ListTeacher} />
          <Route path='/professor/incluir' component={AddTeacher} />
          <Route path='/professor/editar/:id' component={AddTeacher} />
          <Route path='/materia/lista' component={ListSubject} />
          <Route path='/materia/incluir' component={AddSubject} />
          <Route path='/materia/editar/:id' component={AddSubject} />
      </Layout>
    );
  }
}
