import React, { Component } from 'react'



class Table extends React.Component {
  constructor(props) {
    super(props)
    // this.onMoveRowUpButtonClicked = this.onMoveRowUpButtonClicked.bind(this)
    this.state = {data: this.props.data}
  }

  // because the table holds all the data for the table, the handler to affect that data needs to be defined here
  onMoveRowUpButtonClicked = e => {
  // onMoveRowUpButtonClicked(e) {
    let newState = this.props.data

    // todo: use the row ID to change the order of the state data
    newState[0].name = 'charlatan'
    console.log(e.target.getAttribute('data-row-id'))

    this.setState(newState)
  }

  buildTable() {

    // get column headers from the first object's properties
    let columnHeaders = []
    for(let prop in this.props.data[0]) {
      columnHeaders.push(<th key={prop}>{prop}</th>)
    }
    let thead = (
      <thead>
        <tr>
          {columnHeaders}
        </tr>
      </thead>
    )

    let rows = this.props.data.map(x => {
      return <Row data={x} key={x.id} onMoveRowUpButtonClicked={this.onMoveRowUpButtonClicked}/>
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

  // componentWillMount() {
  //   console.log(this.props.onMoveRowUpButtonClicked)
  // }

  render() {
    let cells = []
    for(let prop in this.props.data) {
      cells.push(<Cell value={this.props.data[prop]} key={prop} />)
    }
    let buttons = [
      // <Cell value={<button className='button-move-row-up glyphicon glyphicon-arrow-up btn btn-small'></button>}></Cell>,
      // <Cell value={<button className='button-move-row-up btn btn-small'><i className='glyphicon glyphicon-arrow-up'></i></button>}></Cell>,
      // <td key='up'><button className='button-move-row-up glyphicon glyphicon-arrow-up btn btn-small'></button></td>,
      // <td key='down'><button className='button-move-row-down glyphicon glyphicon-arrow-down btn btn-small'></button></td>,
      <td key='up'><RowButton classes='button-move-row-up glyphicon glyphicon-arrow-up' rowId={this.props.data.id} clicked={this.props.onMoveRowUpButtonClicked} /></td>,
      <td key='down'><RowButton classes='button-move-row-down glyphicon glyphicon-arrow-down' /></td>
    ]
    return <tr>{cells}{buttons}</tr>
  }
}



class Cell extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return <td>{this.props.value}</td>
  }
}



class RowButton extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange.bind(this)
    this.state = {}
  }

  handleChange() {
    console.log(`button clicked`)
  }

  render() {
    let classes = `btn btn-small ${this.props.classes}`

    return (
      <button 
        className={classes}
        onClick={this.props.clicked}
        data-row-id={this.props.rowId}
      ></button>
    )
  }
}


export { Table }