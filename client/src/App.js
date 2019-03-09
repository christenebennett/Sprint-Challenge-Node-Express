import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      projects: []
    }
  }

  componentDidMount(){
    axios
      .get('http://localhost:9090/api/projects')
      .then(res => this.setState({projects: res.data}, console.log(res.data)))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="App">
        <h1>Projects:</h1>
        <div className="projects-list">
          {this.state.projects.map(project => (
            <div key={project.id} className="project">
              <h3>Project:</h3>
              <div>{project.name}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
