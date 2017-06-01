import React from 'react'
import { arraymove } from '../toolbox/array-methods'
import {clone} from '../toolbox/clone'


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

  onMoveRowUpButtonClicked = e => {
    let data = this.props.data
    let id = +e.target.getAttribute('data-object-id')
    let fromIndex = data.findIndex(x => {
      return x.id === id
    })
    data = arraymove(data, fromIndex, fromIndex - 1)

    // set the sortOrder to the array index
    data.forEach((x, i) => {
      x.sortOrder = i
    })

    this.props.updateGlobalState({ data: data })
  }
  onMoveRowDownButtonClicked = e => {
    let data = this.props.data
    let id = +e.target.getAttribute('data-object-id')
    let fromIndex = data.findIndex(x => {
      return x.id === id
    })
    data = arraymove(data, fromIndex, fromIndex + 1)

    // set the sortOrder to the array index
    data.forEach((x, i) => {
      x.sortOrder = i
    })

    this.props.updateGlobalState({ data: data })
  }

  onDeleteRowButtonClicked = e => {
    let newState = this.props.data
    let id = +e.target.getAttribute('data-object-id')
    let index = newState.findIndex(x => {
      return x.id === id
    })

    this.props.deleteEntry(index)
  }

  onUpdateRowButtonClicked = e => {
    let newState = this.props.data
    let id = +e.target.getAttribute('data-object-id')
    let index = newState.findIndex(x => {
      return x.id === id
    })

    this.props.showUpdateForm(id, { test: 'test' })
  }

  sortColumn = column => {
    // sort data in state
    let newState = { 
      data: clone(this.props.data),
      table: {}
    }

    if(this.props.table.currentSortColumn === column && this.props.table.currentSortDirection === 'descending') {
      
      // sort ascending
      newState.data.sort((x, y) => {
        if(x[column] > y[column]) return 1
        if(x[column] < y[column]) return -1
        return 0
      })
      newState.table.currentSortDirection = 'ascending'

    } else {

      // sort descending
      newState.data.sort((x, y) => {
        if(x[column] > y[column]) return -1
        if(x[column] < y[column]) return 1
        return 0
      })
      newState.table.currentSortDirection = 'descending'

    }

    newState.table.currentSortColumn = column

    // update state
    this.props.updateGlobalState(newState)
  }

  buildTable() {
    
    // empty header cell for the row select
    let columnHeaders = [
      (<th key='row-selector'></th>)
    ]

    // get column headers from the first object's properties
    for(let prop in this.props.data[0]) {
      if(!this.state.hiddenTableProperties.includes(prop)) {
        let className = this.props.table.currentSortColumn === prop ? 'column-header-sorted' : 'column-header'
        columnHeaders.push(<th
          className={className}
          key={prop}
          name={prop}
          onClick={e => {
            this.sortColumn(e.target.getAttribute('name'))
          }}
        >{prop}</th>)
      }
    }

    let thead = (
      <thead>
        <tr>
          {columnHeaders}
        </tr>
      </thead>
    )

    let rows = this.props.data.map(x => {
      return (<Row
        entry={x}
        key={x.id}
        onMoveRowUpButtonClicked={this.onMoveRowUpButtonClicked}
        onMoveRowDownButtonClicked={this.onMoveRowDownButtonClicked}
        onDeleteRowButtonClicked={this.onDeleteRowButtonClicked}
        onUpdateRowButtonClicked={this.onUpdateRowButtonClicked}
        hiddenTableProperties={this.state.hiddenTableProperties}
        table={this.props.table}
        rowSelectorClicked={this.props.rowSelectorClicked}
      />)
    })

    let tbody = <tbody>{rows}</tbody>

    let table = <table id='table' className='table'>{thead}{tbody}</table>

    return table
  }

  render() {
    return this.buildTable()
  }
}



class Row extends React.Component {
  constructor(props) {
    super(props)
    // this.state = {}
  }

  render() {
    let cells = []

    let checked = this.props.table.selectedEntryIds.includes(this.props.entry.id) ? true : false

    cells.push(
      <Cell key='row-selector'>
        <input 
          type='checkbox'
          data-object-id={this.props.entry.id}
          onChange={e => {
            this.props.rowSelectorClicked(+e.target.getAttribute('data-object-id'))
          }}
          checked={checked}
        />
      </Cell>
    )

    for(let prop in this.props.entry) {
      if(!this.props.hiddenTableProperties.includes(prop)) {
        cells.push(<Cell value={this.props.entry[prop]} key={prop} />)
      }
    }

    let buttons = [
      <td key='up'><RowButton classes='button-move-row-up glyphicon glyphicon-arrow-up' objectId={this.props.entry.id} clicked={this.props.onMoveRowUpButtonClicked} /></td>,
      <td key='down'><RowButton classes='button-move-row-down glyphicon glyphicon-arrow-down' objectId={this.props.entry.id} clicked={this.props.onMoveRowDownButtonClicked} /></td>,
      <td key='delete'><RowButton classes='button-delete-row glyphicon glyphicon-trash' objectId={this.props.entry.id} clicked={this.props.onDeleteRowButtonClicked} /></td>,
      <td key='update'><RowButton classes='button-update-row glyphicon glyphicon-edit' objectId={this.props.entry.id} clicked={this.props.onUpdateRowButtonClicked} /></td>
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
    return <td>{this.props.value}{this.props.children}</td>
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