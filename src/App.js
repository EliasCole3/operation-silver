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
      console.log(`failed to retrieve data from local storage, loading data from test file`)
      state = testdata1
      localStorage.setItem('operation-silver-last-id', '3')
    } else {
      state = localStorageState
    }

    this.state = state
  }

  reloadStateFromLocalStorage = () => {
    let localStorageState = JSON.parse(localStorage.getItem('operation-silver-data'))
    if(localStorageState !== null && localStorageState.data.length !== 0) {
      this.setState(localStorageState)
      console.log(`reset state to local storage data`)
    } else {
      console.log(`local storage data invalid`)
    }
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

  showSingleView = id => {
    let entryToShow = this.state.data.filter(x => {
      return x.id === id
    })[0]
    console.log('called')
    this.setState({
      activeTab: 3,
      singleViewEntry: entryToShow
    }, this.updateLocalStorage)
  }

  showEventsView = id => {
    let entry = this.state.data.filter(x => {
      return x.id === id
    })[0]
    console.log(entry)
    this.setState({
      modalOpen: true,
      entryWithEventsToUpdate: entry
    }, this.updateLocalStorage)
  }

  showModal = () => {
    this.setState({ modalOpen: true }, this.updateLocalStorage)
  }

  closeModal = () => {
    this.setState({ 
      modalOpen: false,
      entryToUpdate: null,
      entryWithEventsToUpdate: null
    }, this.updateLocalStorage)
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

  getModalBody = () => {
    if(this.state.entryToUpdate) {
      return (<UpdateEntryForm
        entryToUpdate={this.state.entryToUpdate}
        updateEntry={this.updateEntry}
        afterUpdate={() => {
          this.closeModal()
        }}
      />)
    }
    if(this.state.eventsToUpdate) {
      return (
        JSON.stringify(this.state.eventsToUpdate, null, 2)
      )
    }
  }

  getModalTitle = () => {
    return 
  }

  getModalInfo = () => {
    let obj = {}
    obj.title = ''
    obj.body = ''
    obj.footer = ''

    if(this.state.entryToUpdate) {
      obj.title = `Updating Entry ${this.state.entryToUpdate.id}`
      obj.body = (<UpdateEntryForm
        entryToUpdate={this.state.entryToUpdate}
        updateEntry={this.updateEntry}
        afterUpdate={() => {
          this.closeModal()
        }}
      />)
    }
    if(this.state.entryWithEventsToUpdate) {
      obj.title = `Updating events for entry ${this.state.entryWithEventsToUpdate.id}`
      obj.body = JSON.stringify(this.state.entryWithEventsToUpdate.events, null, 2)
    }

    return obj
  }

  afterTabChange = index => {
    this.setState({ activeTab: index }, this.updateLocalStorage)
  }

  render() {
    return (
      <div className='App'>



        <Tabs 
          tabActive={this.state.activeTab}
          onAfterChange={this.afterTabChange}
        >

          <Tabs.Panel title='Table'>

            <Table 
              data={this.state.data}
              deleteEntry={this.deleteEntry}
              updateEntry={this.updateEntry}
              showUpdateForm={this.showUpdateForm}
              showSingleView={this.showSingleView}
              showEventsView={this.showEventsView}
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


            
            

          </Tabs.Panel>




          <Tabs.Panel title='New'>
            <CreateEntryForm
              addNewEntryToData={this.addNewEntryToData}
              getNewId={this.getNewId}
            />
          </Tabs.Panel>

          <Tabs.Panel title='Single'>
            <div id='single-view-wrapper'>
              <pre>
                {JSON.stringify(this.state.singleViewEntry, null, 2)}
              </pre>
            </div>
          </Tabs.Panel>
        </Tabs>

        {/*for gui tests*/}
        <button id='reload-state-from-local-storage-button' onClick={this.reloadStateFromLocalStorage}></button>

        <Modal
          show={this.state.modalOpen}
          close={this.closeModal}
          title={this.getModalInfo().title}
          body={this.getModalInfo().body}
          footer={this.getModalInfo().footer}
        />

      </div>
    )
  }
}

export default App


