import React, { Component } from 'react'

// CSS
import './styles/App.css'
import './styles/react-simpletabs.css'
// import logo from './logo.svg'

// external libraries
import Tabs from 'react-simpletabs'
const moment = require('moment')
import * as bs from 'react-bootstrap'

// internal dependencies
import { Table } from './components/table.jsx'
import { NewEntryForm } from './components/new-entry-form'
import { Modal } from './components/bs-modal-wrapper'
// import * as main from './main.js'
// import { Class1 } from './components/test-components'
import { clone } from './toolbox/clone'
import { savefile } from './toolbox/savefile'
import { loadfile } from './toolbox/loadfile'

// data
import { data as testdata1 } from './sample-data/data1.js'



class App extends Component {



  constructor(props) {
    super(props)

    // console.log(localStorage.getItem('operation-silver-next-id'))
    // console.log(JSON.parse(localStorage.getItem('operation-silver-next-id')))
    if(JSON.parse(localStorage.getItem('operation-silver-last-id')) === null) {
      localStorage.setItem('operation-silver-last-id', '0')
    }

    let localStorageState = JSON.parse(localStorage.getItem('operation-silver-data'))
    let state
    if(localStorageState === null || localStorageState.state.data.length === 0) {
      state = testdata1
    } else {
      state = localStorageState.state
    }

    this.state = state
  }

  addNewEntryToData = newEntry => {
    let newState = clone(this.state)
    newState.data.push(newEntry)
    this.setState(newState)
    localStorage.setItem('operation-silver-data', JSON.stringify(newState))
  }

  deleteEntry = index => {
    let newState = clone(this.state)
    newState.data.splice(index, 1)
    this.setState(newState)
    localStorage.setItem('operation-silver-data', JSON.stringify(newState))
  }

  updateEntry = (index, data) => {
    console.log('updating entry')
    console.log(index)
    console.log(data)

  }

  showUpdateForm = (index) => {
    this.setState({ modalOpen: true })
  }

  showModal = () => {
    this.setState({ modalOpen: true })
  }

  closeModal = () => {
    this.setState({ modalOpen: false })
  }

  render() {
    return (
      <div className='App'>



        <Tabs>

          <Tabs.Panel title='Table'>
            <Table data={this.state.data} deleteEntry={this.deleteEntry} updateEntry={this.updateEntry} showUpdateForm={this.showUpdateForm} />

            <div id='state-box-wrapper'>
              <textarea id='state-box' value={JSON.stringify(this.state, '', 2)} onChange={e => { }}></textarea>
            </div>

            <button
              id='savefile'
              className='btn btn-lg'
              onClick={e => {
                let filename = `silver-state_${moment().format('MM_DD_YY_hh_mm_ss')}.json`
                savefile(JSON.stringify(this.state, '', 2), filename)
              }}
            >Save</button>

            <button
              id='loadfile'
              className='btn btn-lg'
              onClick={e => {
                {/*loadfile(data => { console.log(data) })*/ }
                loadfile(data => {
                  let newState = JSON.parse(data)
                  this.setState(newState)
                  localStorage.setItem('operation-silver-data', JSON.stringify(newState))
                })
              }}
            >Load</button>


            <Modal 
              show={this.state.modalOpen}
              close={this.closeModal}
              title={`Updating Entry`}
              body={`asdfasdf`}
              footer={(
                <button className='btn btn-primary' onClick={e => { this.setState({ modalOpen: false }) }}>
                  Save
                </button> 
              )}
            />
            

          </Tabs.Panel>




          <Tabs.Panel title='New'>
            <NewEntryForm addNewEntryToData={this.addNewEntryToData} />
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


