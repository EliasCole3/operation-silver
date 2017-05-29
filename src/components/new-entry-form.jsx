import React from 'react'
import { Input, Textarea } from './form-components'
import { clone } from '../toolbox/clone'


class NewEntryForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      formControls: {
        description: ''
      }
    }
  }

  handleFormControlChange = event => {
    let newState = {
      formControls: {
        [event.target.getAttribute('name')]: event.target.value
      }
    }
    this.setState(newState)
  }

  submitForm = e => {
    let dataToSubmit = clone(this.state.formControls)

    window.localStorage.setItem('operation-silver-new-entry', JSON.stringify(dataToSubmit))

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











export { NewEntryForm }