import React from 'react'



class Input extends React.Component {
  buildComponent() {
    let input = (
      <span>
        <label className='my-label'>{this.props.label}</label> <br />
        <input id={this.props.id} type='text' name={this.props.name} className='my-form-control' value={this.props.value} onChange={this.props.handleChange} />
      </span>
    )

    return input
  }

  render() {
    return this.buildComponent()
  }
}

Input.propTypes = {
  id: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.node.isRequired,
  handleChange: React.PropTypes.func.isRequired
}



class Textarea extends React.Component {
  buildComponent() {
    let input = (
      <span>
        <label className='my-label'>{ this.props.label }</label> <br />
        <textarea id={this.props.id} type='text' name={this.props.name} className='my-form-control' value={this.props.value} onChange={this.props.handleChange} />
      </span>
    )

    return input
  }

  render() {
    return this.buildComponent()
  }
}

Textarea.propTypes = {
  id: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.node.isRequired,
  handleChange: React.PropTypes.func.isRequired
}


export { Input, Textarea }