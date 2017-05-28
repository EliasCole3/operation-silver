import React from 'react'







class Input extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: this.props.data
    }
  }

  buildComponent() {
    let input = (
      <label>
        { this.props.label }: 
        <input type='text' value={this.state.value} onChange={this.props.handleChange} />
      </label>
    )

    return input
  }

  render() {
    return this.buildComponent()
  }
}





















export { Input }