import React from 'react'
import { arraymove } from '../toolbox/array-methods.js'



class Table extends React.Component {
  constructor(props) {

    // calls the parent constructor
    // if not included: Syntax error: 'this' is not allowed before super()
    super(props)

    this.state = {
      data: this.props.data,
      hiddenTableProperties: [
        'sortOrder'
      ]
    }
  }

  // because the table holds all the data for the table, the handler to affect that data needs to be defined here
  onMoveRowUpButtonClicked = e => {
    let newState = this.state.data

    let id = +e.target.getAttribute('data-object-id')

    let fromIndex = newState.findIndex(x => {
      return x.id === id
    })

    newState = arraymove(newState, fromIndex, fromIndex-1)

    // set the sortOrder to the array index
    newState.forEach((x, i)=> {
      x.sortOrder = i
    })

    this.setState({data: newState})
  }

  onMoveRowDownButtonClicked = e => {
    let newState = this.state.data

    let id = +e.target.getAttribute('data-object-id')

    let fromIndex = newState.findIndex(x => {
      return x.id === id
    })

    newState = arraymove(newState, fromIndex, fromIndex+1)

    // set the sortOrder to the array index
    newState.forEach((x, i)=> {
      x.sortOrder = i
    })

    this.setState({data: newState})
  }

  buildTable() {
    // get column headers from the first object's properties
    let columnHeaders = []
    for(let prop in this.state.data[0]) {
      if(!this.state.hiddenTableProperties.includes(prop)) {
        columnHeaders.push(<th key={prop}>{prop}</th>)
      }
    }
    
    let thead = (
      <thead>
        <tr>
          {columnHeaders}
        </tr>
      </thead>
    )

    let rows = this.state.data.map(x => {
      return (<Row 
        data={x} 
        key={x.id} 
        onMoveRowUpButtonClicked={this.onMoveRowUpButtonClicked}
        onMoveRowDownButtonClicked={this.onMoveRowDownButtonClicked}
        hiddenTableProperties={this.state.hiddenTableProperties}
      />)
    })

    let tbody = <tbody>{rows}</tbody>

    let table = <table className='table'>{thead}{tbody}</table>

    return table
  }

  render() {
    return this.buildTable()
  }
}



class Row extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    let cells = []

    for(let prop in this.props.data) {
      if(!this.props.hiddenTableProperties.includes(prop)) {
        cells.push(<Cell value={this.props.data[prop]} key={prop} />)
      }
    }

    let buttons = [
      <td key='up'><RowButton classes='button-move-row-up glyphicon glyphicon-arrow-up' objectId={this.props.data.id} clicked={this.props.onMoveRowUpButtonClicked} /></td>,
      <td key='down'><RowButton classes='button-move-row-down glyphicon glyphicon-arrow-down' objectId={this.props.data.id} clicked={this.props.onMoveRowDownButtonClicked} /></td>
    ]

    return <tr>{cells}{buttons}</tr>
  }
}



class Cell extends React.Component {
  // constructor(props) {
  //   super(props)
  //   // this.state = {}
  // }

  render() {
    return <td>{this.props.value}</td>
  }
}



class RowButton extends React.Component {
  // constructor(props) {
  //   super(props)
  //   // this.handleChange.bind(this)
  //   // this.state = {}
  // }

  // handleChange() {
  //   console.log(`button clicked`)
  // }

  render() {
    let classes = `btn btn-small ${this.props.classes}`

    return (
      <button 
        className={classes}
        onClick={this.props.clicked}
        data-object-id={this.props.objectId}
      ></button>
    )
  }
}


export { Table }