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
import { CreateEntryForm, UpdateEntryForm } from './components/crud-forms'
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
    if(localStorageState === null || localStorageState.data.length === 0) {
      state = testdata1
    } else {
      state = localStorageState
    }

    this.state = state
  }

  updateLocalStorage = () => {
    // console.log(this.state)
    localStorage.setItem('operation-silver-data', JSON.stringify(this.state))
  }

  updateGlobalState = (newState, callback=null) => {
    // this.setState(newState, this.updateLocalStorage)
    this.setState(newState, () => {
      this.updateLocalStorage()
      if(callback) callback()
    })
  }

  addNewEntryToData = newEntry => {
    let newState = clone(this.state)
    newState.data.push(newEntry)
    this.setState(newState, this.updateLocalStorage)
  }

  deleteEntry = index => {
    let newState = clone(this.state)
    newState.data.splice(index, 1)
    this.setState(newState, this.updateLocalStorage)
  }

  updateEntry = entry => {
    let newState = clone(this.state)
    let index = newState.data.findIndex(x => {
      return x.id === entry.id
    })
    for(let prop in entry) {
      newState.data[index][prop] = entry[prop]
    }
    this.setState(newState, this.updateLocalStorage)
  }

  showUpdateForm = id => {
    let entryToUpdate = this.state.data.filter(x => {
      return x.id === id
    })[0]
    this.setState({
      modalOpen: true,
      entryToUpdate: entryToUpdate
    }, this.updateLocalStorage)
  }

  showModal = () => {
    this.setState({ modalOpen: true }, this.updateLocalStorage)
  }

  closeModal = () => {
    this.setState({ modalOpen: false }, this.updateLocalStorage)
  }

  rowSelectorClicked = entryId => {
    let newState = clone(this.state)

    if(newState.table.selectedEntryIds.includes(entryId)) {
      newState.table.selectedEntryIds = newState.table.selectedEntryIds.filter(x => { return x !== entryId })
    } else {
      newState.table.selectedEntryIds.push(entryId)
    }

    this.setState(newState, this.updateLocalStorage)
  }

  getNewId = () => {
    let newId = JSON.parse(localStorage.getItem('operation-silver-last-id'))
    newId++
    localStorage.setItem('operation-silver-last-id', JSON.stringify(newId))
    return newId
  }

  render() {
    return (
      <div className='App'>



        <Tabs>

          <Tabs.Panel title='Table'>

            <Table 
              data={this.state.data}
              deleteEntry={this.deleteEntry}
              updateEntry={this.updateEntry}
              showUpdateForm={this.showUpdateForm}
              updateGlobalState={this.updateGlobalState}
              table={this.state.table}
              rowSelectorClicked={this.rowSelectorClicked}
            />

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
                loadfile(data => {
                  let newState = JSON.parse(data)
                  this.setState(newState, this.updateLocalStorage)
                })
              }}
            >Load</button>


            <Modal 
              show={this.state.modalOpen}
              close={this.closeModal}
              title={`Updating Entry ${this.state.entryToUpdate === null ? '' : this.state.entryToUpdate.id}`}
              body={
                <UpdateEntryForm
                  entryToUpdate={this.state.entryToUpdate}
                  updateEntry={this.updateEntry}
                  afterUpdate={() => {
                    this.closeModal()
                  }}
                />
              }
            />
            

          </Tabs.Panel>




          <Tabs.Panel title='New'>
            <CreateEntryForm
              addNewEntryToData={this.addNewEntryToData}
              getNewId={this.getNewId}
            />
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


