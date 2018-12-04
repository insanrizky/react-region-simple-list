import React, { Component } from 'react';
import './App.css';
import Form from './components/Form';
import List from './components/List';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Form/>
          <List/>
        </header>
      </div>
    );
  }
}

export default App;
