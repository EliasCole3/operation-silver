import React from 'react'
import { Input } from './form-components'


class NewEntryForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: this.props.data
    }
  }

  buildForm() {
    let form = <Input label='Business Name' />

    return form
  }

  render() {
    return this.buildForm()
  }
}











export { NewEntryForm }