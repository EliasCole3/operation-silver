import React from 'react'
import { Input, Textarea } from './form-components'
import { clone } from '../toolbox/clone'


class CreateEntryForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      formControls: {
        company: '',
        description: '',
        jobTitle: '',
        notes: ''
      }
    }
  }

  handleFormControlChange = event => {
    let newState = clone(this.state)
    newState.formControls[event.target.getAttribute('name')] = event.target.value
    this.setState(newState)
  }

  submitForm = e => {
    let dataToSubmit = clone(this.state.formControls)

    let newId = JSON.parse(localStorage.getItem('operation-silver-last-id'))
    newId++
    localStorage.setItem('operation-silver-last-id', JSON.stringify(newId))
    
    // console.log(dataToSubmit)
    // create new entry payload from form control data
    let newEntry = {
      id: newId,
      company: dataToSubmit.company,
      description: dataToSubmit.description,
      jobTitle: dataToSubmit.jobTitle,
      notes: dataToSubmit.notes,
      sortOrder: newId
    }

    this.props.addNewEntryToData(newEntry)

    // window.localStorage.setItem('operation-silver-new-entry', JSON.stringify(dataToSubmit))

    // clear the form fields
    let newState = clone(this.state)
    for(let prop in newState.formControls) {
      newState.formControls[prop] = ''
    }
    this.setState(newState)
  }

  buildForm() {
    let form = (<span>
      <Input label='Company' name='company' value={this.state.formControls.company} handleChange={this.handleFormControlChange} /> <br/>
      <Textarea label='Description' name='description' value={this.state.formControls.description} handleChange={this.handleFormControlChange} /> <br/>
      <Input label='Job Title' name='jobTitle' value={this.state.formControls.jobTitle} handleChange={this.handleFormControlChange} /> <br/>
      <Textarea label='Notes' name='notes' value={this.state.formControls.notes} handleChange={this.handleFormControlChange} /> <br/>

      <button id='submit-new-entry' className='btn btn-lg' onClick={this.submitForm}>Submit</button>
    </span>)

    return form
  }

  render() {
    return this.buildForm()
  }
}



class UpdateEntryForm extends React.Component {
  constructor(props) {
    super(props)
    // console.log(this.props)
    this.state = {
      formControls: {
        company: this.props.entryToUpdate.company,
        description: this.props.entryToUpdate.description,
        jobTitle: this.props.entryToUpdate.jobTitle,
        notes: this.props.entryToUpdate.notes
      }
    }
  }

  handleFormControlChange = event => {
    let newState = clone(this.state)
    newState.formControls[event.target.getAttribute('name')] = event.target.value
    this.setState(newState)
  }

  submitForm = e => {
    let dataToSubmit = clone(this.state.formControls)

    let entry = {
      id: this.props.entryToUpdate.id,
      company: dataToSubmit.company,
      description: dataToSubmit.description,
      jobTitle: dataToSubmit.jobTitle,
      notes: dataToSubmit.notes
    }

    this.props.updateEntry(entry)

    // clear the form fields
    let newState = clone(this.state)
    for(let prop in newState.formControls) {
      newState.formControls[prop] = ''
    }
    this.setState(newState)
    
    this.props.closeModal()
  }

  buildForm() {
    let form = (<span>
      <Input label='Company' name='company' value={this.state.formControls.company} handleChange={this.handleFormControlChange} /> <br/>
      <Textarea label='Description' name='description' value={this.state.formControls.description} handleChange={this.handleFormControlChange} /> <br/>
      <Input label='Job Title' name='jobTitle' value={this.state.formControls.jobTitle} handleChange={this.handleFormControlChange} /> <br/>
      <Textarea label='Notes' name='notes' value={this.state.formControls.notes} handleChange={this.handleFormControlChange} /> <br/>

      <button id='submit-new-entry' className='btn btn-lg' onClick={this.submitForm}>Submit</button>
    </span>)

    return form
  }

  render() {
    return this.buildForm()
  }
}











export { CreateEntryForm, UpdateEntryForm }