import React, { Component } from 'react'

// CSS
import './styles/App.css'
import './styles/react-simpletabs.css'
// import logo from './logo.svg'

// external libraries
import Tabs from 'react-simpletabs'
const moment = require('moment')
// import * as bs from 'react-bootstrap'

// internal dependencies
import { Table } from './components/table.jsx'
import { NewEntryForm } from './components/new-entry-form'
// import * as main from './main.js'
// import { Class1 } from './components/test-components'

// data
import { data as testdata1 } from './sample-data/data1.js'



class App extends Component {
  render() {
    return (
      <div className='App'>
        
        {/*<input id='input-1' className='my-form-control' />
        <bs.FormControl
          type='text'
          id='input-2'
        />

        <button id='button-1' className='btn btn-medium' onClick={main.doTheThing}>button 1</button>
        <bs.Button id='button-2' bsStyle="primary" onClick={() => {main.saveToLocalStorage('asdf')}}>button 2</bs.Button>

        <Class1 />*/}


        <Tabs>
          <Tabs.Panel title='New'>
            <NewEntryForm />
          </Tabs.Panel>

          <Tabs.Panel title='Table'>
            <Table data={testdata1} />
          </Tabs.Panel>

          <Tabs.Panel title='Single'>
            <h2>todo: single view</h2>
          </Tabs.Panel>
        </Tabs>


        

      </div>
    )
  }
}

export default App


