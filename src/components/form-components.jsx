import React from 'react'



class Input extends React.Component {
  buildComponent() {
    let input = (
      <span>
        <label className='my-label'>{this.props.label}</label> <br />
        <input type='text' name={this.props.name} className='my-form-control' value={this.props.value} onChange={this.props.handleChange} />
      </span>
    )

    return input
  }

  render() {
    return this.buildComponent()
  }
}

class Textarea extends React.Component {
  buildComponent() {
    let input = (
      <span>
        <label className='my-label'>{ this.props.label }</label> <br />
        <textarea type='text' name={this.props.name} className='my-form-control' value={this.props.value} onChange={this.props.handleChange} />
      </span>
    )

    return input
  }

  render() {
    return this.buildComponent()
  }
}



export { Input, Textarea }