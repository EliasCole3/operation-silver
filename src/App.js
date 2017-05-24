import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as bs from 'react-bootstrap';
import * as main from './main.js';

class App extends Component {
  render() {
    return (
      <div className='App'>
        
        <input id='input-1' className='my-form-control' />
        <bs.FormControl
          type='text'
          id='input-2'
        />

        <button id='button-1' className='btn btn-medium' onClick={main.doTheThing}>button 1</button>
        <bs.Button id='button-2' bsStyle="primary" onClick={main.saveToLocalStorage('asdf')}>button 2</bs.Button>

      </div>
    );
  }
}

export default App;
