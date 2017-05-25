import React, { Component } from 'react';

// import logo from './logo.svg';
import './App.css';
import * as bs from 'react-bootstrap';
import * as main from './main.js';
import { Table } from './components/table.jsx'
import { data as testdata1 } from './sample-data/data1.js'

// import 'moment'
// import 'moment' from 'moment/src/moment'
let moment = require('moment')

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
        <bs.Button id='button-2' bsStyle="primary" onClick={() => {main.saveToLocalStorage('asdf')}}>button 2</bs.Button>

        <Class1 />

        <Table data={testdata1} />

      </div>
    );
  }
}

export default App;


class Class1 extends React.Component {

  constructor(props) {
    // console.log('Class1 being constructed')
    super(props)
    this.state = { 
      date: new Date(),
      momentDate: moment() 
    }
  }

  getDateProperties() {
    let temp = []
    Object.getOwnPropertyNames(this.state.date.__proto__).forEach(x => {
      temp.push(x)
    })
    temp.sort().join(', ')
    return temp
  }

  componentWillMount() {
    // console.log(`Class1: componentWillMount()`)
  }

  render() {
    // console.log(`Class1 rendering`)
    return <div>
      Class1 <br />

      {/*{this.getDateProperties()}*/}

      Created: {this.state.momentDate.format('hh:mm:ssa MM.DD.YYYY')}
    </div>
  }

  componentDidMount() {
    // console.log(`Class1: componentDidMount()`)
  }

  componentWillUnmount() {
    // console.log(`Class1: componentWillUnmount()`)
  }

}

class Class2 extends React.Component {
  render() {
    return <div>Class2</div>
  }
}

class Class3 extends React.Component {
  render() {
    return <div>Class3</div>
  }
}
