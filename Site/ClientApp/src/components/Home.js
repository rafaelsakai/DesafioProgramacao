import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>Olá!</h1>
        <p>Aplicação Desafio de Programação construida com:</p>
        <ul>
          <li>ASP.NET Core, API Restful e C# para cross-platform e server-side code</li>
          <li>React para client-side code</li>
          <li>Bootstrap para layout e style</li>
          <li>Dependency injection</li>
          <li>Repository Pattern</li>
          <li>Factory Pattern para service e repository</li>
        </ul>
      </div>
    );
  }
}
