import React, { Component } from 'react'
// import { clone } from '../src/toolbox/clone'
import PropTypes from 'prop-types'

function clone(value) {
  return JSON.parse(JSON.stringify(value))
}



export class BeerListContainer extends Component {

  constructor(props) {
    super(props)

    this.addItem = this.addItem.bind(this)

    this.state = {
      beers: []
    }
  }

  addItem(name) {
    let newState = clone(this.state)
    newState.beers.push(...[name])
    this.setState(newState)
  }

  render() {
    // return <span>Beer!</span>
    return (
      <div>
        <InputArea onSubmit={this.addItem} />
        <BeerList items={this.state.beers} />
      </div>
    )
  }
}



export class InputArea extends Component {

  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
    this.setText = this.setText.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  setText(event) {
    this.setState({ text: event.target.value })
  }

  handleClick() {
    this.props.onSubmit(this.state.text);
  }

  render() {
    return (
      <div>
        <input value={this.state.text} onChange={this.setText} />
        <button onClick={this.handleClick}>Add</button>
      </div>
    )
  }
}

InputArea.propTypes = {
  onSubmit: React.PropTypes.func.isRequired
}



export class BeerList extends Component {
  render() {
    return this.props.items ?
      (<ul>
        {this.props.items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>)
      : null
  }
}

BeerList.propTypes = {
  items: React.PropTypes.array.isRequired
}