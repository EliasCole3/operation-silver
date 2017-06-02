import React from 'react'
import { arraymove } from '../toolbox/array-methods'
import { clone } from '../toolbox/clone'
import { findPatternInData } from '../toolbox/find-pattern-in-data'

class Table extends React.Component {
  constructor(props) {
    // calls the parent constructor
    // if not included: Syntax error: 'this' is not allowed before super()
    super(props)
  }

  onMoveRowUpButtonClicked = e => {
    let newState = clone(this.props)
    let id = +e.target.getAttribute('data-object-id')
    let fromIndex = newState.data.findIndex(x => {
      return x.id === id
    })
    newState.data = arraymove(newState.data, fromIndex, fromIndex - 1)

    // set the sortOrder to the array index
    newState.data.forEach((x, i) => {
      x.sortOrder = i
    })

    this.props.updateGlobalState(newState)
  }
  onMoveRowDownButtonClicked = e => {
    let newState = clone(this.props)
    let id = +e.target.getAttribute('data-object-id')
    let fromIndex = newState.data.findIndex(x => {
      return x.id === id
    })
    newState.data = arraymove(newState.data, fromIndex, fromIndex + 1)

    // set the sortOrder to the array index
    newState.data.forEach((x, i) => {
      x.sortOrder = i
    })

    this.props.updateGlobalState(newState)
  }

  onDeleteRowButtonClicked = e => {
    let newState = clone(this.props)
    let id = +e.target.getAttribute('data-object-id')
    let index = newState.data.findIndex(x => {
      return x.id === id
    })

    this.props.deleteEntry(index)
  }

  onUpdateRowButtonClicked = e => {
    let id = +e.target.getAttribute('data-object-id')
    let index = this.props.data.findIndex(x => {
      return x.id === id
    })
    this.props.showUpdateForm(id)
  }

  sortColumn = column => {
    let newState = clone(this.props)

    if(this.props.table.currentSortColumn === column && this.props.table.currentSortDirection === 'descending') {
      newState.data.sort((x, y) => {
        // sort ascending
        if(x[column] > y[column]) return 1
        if(x[column] < y[column]) return -1
        return 0
      })
      newState.table.currentSortDirection = 'ascending'
    } else {
      newState.data.sort((x, y) => {
        // sort descending
        if(x[column] > y[column]) return -1
        if(x[column] < y[column]) return 1
        return 0
      })
      newState.table.currentSortDirection = 'descending'
    }

    newState.table.currentSortColumn = column

    this.props.updateGlobalState(newState)
  }

  buildTable() {
    let data = clone(this.props.data)

    // filter the table data down based on the search string
    if(this.props.table.searchString !== '') {
      console.log(`current search string: '${this.props.table.searchString}'`)

      let regex = new RegExp(this.props.table.searchString, 'i')

      data = data.filter(x => {
        for(let prop in x) {
          if(regex.test(x[prop])) return true
        }
        return false
      })
    }

    // empty header cell for the row select
    let columnHeaders = [
      (<th key='row-selector'></th>)
    ]

    // get column headers from the first object's properties
    for(let prop in data[0]) {
      if(!this.props.table.hiddenTableProperties.includes(prop)) {
        let className = this.props.table.currentSortColumn === prop ? 'column-header-sorted' : 'column-header'
        columnHeaders.push(
          <th
            className={className}
            key={prop}
            name={prop}
            onClick={e => {
              this.sortColumn(e.target.getAttribute('name'))
            }}
          >
            {prop}
          </th>
        )
      }
    }

    let thead = (
      <thead>
        <tr>
          {columnHeaders}
        </tr>
      </thead>
    )

    let rows = data.map(x => {
      return (
        <Row
          entry={x}
          key={x.id}
          onMoveRowUpButtonClicked={this.onMoveRowUpButtonClicked}
          onMoveRowDownButtonClicked={this.onMoveRowDownButtonClicked}
          onDeleteRowButtonClicked={this.onDeleteRowButtonClicked}
          onUpdateRowButtonClicked={this.onUpdateRowButtonClicked}
          hiddenTableProperties={this.props.table.hiddenTableProperties}
          table={this.props.table}
          rowSelectorClicked={this.props.rowSelectorClicked}
        />
      )
    })

    let tbody = <tbody>{rows}</tbody>

    let table = <table id='table' className='table'>{thead}{tbody}</table>

    let fullTable = (
      <div id='table-wrapper'>
        <ControlBar
          data={this.props.data}
          table={this.props.table}
          updateGlobalState={this.props.updateGlobalState}
        />
        {table}
      </div>
    )

    return fullTable
  }

  render() {
    return this.buildTable()
  }
}




class ControlBar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id='table-control-bar'>
        <SearchBox
          data={this.props.data}
          table={this.props.table}
          updateGlobalState={this.props.updateGlobalState}
        />
      </div>
    )
  }
}

class SearchBox extends React.Component {
  constructor(props) {
    super(props)
  }

  search = searchString => {
    let table = clone(this.props.table)
    table.searchString = searchString
    this.props.updateGlobalState({table: table})
  }

  render() {
    return (
      <input
        type='text'
        className='my-form-control'
        onChange={e => { this.search(e.target.value) }}
      />
    )
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