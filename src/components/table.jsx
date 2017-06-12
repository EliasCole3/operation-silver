import React from 'react'
import { arraymove } from '../toolbox/array-methods'
import { clone } from '../toolbox/clone'
// import { findPatternInData } from '../toolbox/find-pattern-in-data'
const moment = require('moment')

class Table extends React.Component {
  // constructor(props) {
  //   // calls the parent constructor
  //   // if not included: Syntax error: 'this' is not allowed before super()
  //   super(props)
  // }

  onMoveRowUpButtonClicked = e => {
    let data = clone(this.props.data)
    let id = +e.target.getAttribute('data-entry-id')
    let fromIndex = data.findIndex(x => {
      return x.id === id
    })
    data = arraymove(data, fromIndex, fromIndex - 1)

    // set the sortOrder to the array index
    data.forEach((x, i) => {
      x.sortOrder = i
    })

    this.props.updateData(data)
  }
  onMoveRowDownButtonClicked = e => {
    let data = clone(this.props.data)
    let id = +e.target.getAttribute('data-entry-id')
    let fromIndex = data.findIndex(x => {
      return x.id === id
    })
    data = arraymove(data, fromIndex, fromIndex + 1)

    // set the sortOrder to the array index
    data.forEach((x, i) => {
      x.sortOrder = i
    })

    this.props.updateData(data)
  }

  onDeleteRowButtonClicked = e => {
    let newState = clone(this.props)
    let id = +e.target.getAttribute('data-entry-id')
    let index = newState.data.findIndex(x => {
      return x.id === id
    })

    this.props.deleteEntry(index)
  }

  onUpdateRowButtonClicked = e => {
    let id = +e.target.getAttribute('data-entry-id')
    this.props.showUpdateForm(id)
  }

  onSingleViewRowButtonClicked = e => {
    let id = +e.target.getAttribute('data-entry-id')
    this.props.showSingleView(id)
  }

  onEventsRowButtonClicked = e => {
    let id = +e.target.getAttribute('data-entry-id')
    this.props.showEventsView(id)
  }

  sortColumn = column => {
    let newSettings = clone(this.props.tableSettings)
    let data = clone(this.props.data)

    if(this.props.tableSettings.currentSortColumn === column && this.props.tableSettings.currentSortDirection === 'descending') {
      data.sort((x, y) => {
        // sort ascending
        if(x[column] > y[column]) return 1
        if(x[column] < y[column]) return -1
        return 0
      })
      newSettings.currentSortDirection = 'ascending'
    } else {
      data.sort((x, y) => {
        // sort descending
        if(x[column] > y[column]) return -1
        if(x[column] < y[column]) return 1
        return 0
      })
      newSettings.currentSortDirection = 'descending'
    }

    newSettings.currentSortColumn = column

    this.props.updateTableSettingsAndData(newSettings, data)
  }

  buildTable() {
    let data = clone(this.props.data)

    // console.log(this.props.tableSettings)

    // filter the table data down based on the search string
    if(this.props.tableSettings.searchString !== '') {
      console.log(`current search string: '${this.props.tableSettings.searchString}'`)

      let regex = new RegExp(this.props.tableSettings.searchString, 'i')

      data = data.filter(x => {
        for(let prop in x) {
          if(regex.test(x[prop])) return true
        }
        return false
      })
    }

    let columnHeaders = []

    // empty header cell for the row select
    if(this.props.enabledFeatures && this.props.enabledFeatures.includes('row selectors')) {
      columnHeaders.push(<th key='row-selector'></th>)
    }

    // get column headers from the first object's properties
    for(let prop in data[0]) {
      if(!this.props.tableSettings.hiddenTableProperties.includes(prop)) {
        let className = this.props.tableSettings.currentSortColumn === prop ? 'column-header-sorted' : 'column-header'
        columnHeaders.push(
          <th
            className={className}
            key={prop}
            name={prop}
            onClick={e => {
              if(this.props.enabledFeatures && this.props.enabledFeatures.includes('column sorting')) {
                this.sortColumn(e.target.getAttribute('name'))
              }
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
          onSingleViewRowButtonClicked={this.onSingleViewRowButtonClicked}
          onEventsRowButtonClicked={this.onEventsRowButtonClicked}
          hiddenTableProperties={this.props.tableSettings.hiddenTableProperties}
          tableSettings={this.props.tableSettings}
          rowSelectorClicked={this.props.rowSelectorClicked}
          customRowButtons={this.props.customRowButtons}
          enabledFeatures={this.props.enabledFeatures}
        />
      )
    })

    let tbody = <tbody>{rows}</tbody>

    let table = <table id='table' className='table'>{thead}{tbody}</table>

    let fullTable = (
      <div id='table-wrapper'>
        <ControlBar
          data={this.props.data}
          tableSettings={this.props.tableSettings}
          updateTableSettings={this.props.updateTableSettings}
          enabledFeatures={this.props.enabledFeatures}
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
  build = () => {
    let elements = []

    if(this.props.enabledFeatures && this.props.enabledFeatures.includes('search')) {
      elements.push(<SearchBox
        key='searchbox'
        data={this.props.data}
        tableSettings={this.props.tableSettings}
        updateTableSettings={this.props.updateTableSettings}
      />)
    }

    return elements
  }

  render() {
    return (
      <div id='table-control-bar'>
        {this.build()}
      </div>
    )
  }
}

class SearchBox extends React.Component {
  search = searchString => {
    let tableSettings = clone(this.props.tableSettings)
    tableSettings.searchString = searchString
    this.props.updateTableSettings(tableSettings)
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
  render() {
    let cells = []

    if(this.props.enabledFeatures && this.props.enabledFeatures.includes('row selectors')) {
      let checked = this.props.tableSettings.selectedEntryIds.includes(this.props.entry.id) ? true : false
      cells.push(
        <Cell key='row-selector'>
          <input
            type='checkbox'
            className='row-selector-checkbox'
            data-entry-id={this.props.entry.id}
            onChange={e => {
              this.props.rowSelectorClicked(+e.target.getAttribute('data-entry-id'))
            }}
            checked={checked}
          />
        </Cell>
      )
    }

    for(let prop in this.props.entry) {
      if(!this.props.hiddenTableProperties.includes(prop)) {
        if(prop === 'created' || prop === 'updated') {
          // let value = moment(this.props.entry[prop], 'x').format('MM.DD.YY h:mm:ss a')
          // let value = moment(this.props.entry[prop], 'x').format('MM.DD.YY')
          let value = moment(this.props.entry[prop], 'x').format('MM/DD/YY HH:mm:ss')
          cells.push(<Cell value={value} key={prop} />)
        } else {
          cells.push(<Cell value={this.props.entry[prop]} key={prop} />)
        }
      }
    }
    
    let buttons = []

    

    if(this.props.enabledFeatures && this.props.enabledFeatures.includes('delete')) {
      buttons.push(<td key='delete'><RowButton classes='button-delete-row glyphicon glyphicon-trash' entryId={this.props.entry.id} clicked={this.props.onDeleteRowButtonClicked} /></td>)
    }

    if(this.props.enabledFeatures && this.props.enabledFeatures.includes('update')) {
      buttons.push(<td key='update'><RowButton classes='button-update-row glyphicon glyphicon-edit' entryId={this.props.entry.id} clicked={this.props.onUpdateRowButtonClicked} /></td>)
    }
    
    if(this.props.enabledFeatures && this.props.enabledFeatures.includes('view')) {
      buttons.push(<td key='single-view'><RowButton classes='button-single-view-row glyphicon glyphicon-eye-open' entryId={this.props.entry.id} clicked={this.props.onSingleViewRowButtonClicked} /></td>)
    }

    if(this.props.enabledFeatures && this.props.enabledFeatures.includes('row transiency')) {
      buttons.push(<td key='up'> <RowButton classes='button-move-row-up glyphicon glyphicon-arrow-up' entryId={this.props.entry.id} clicked={this.props.onMoveRowUpButtonClicked} /></td>)
      buttons.push(<td key='down'><RowButton classes='button-move-row-down glyphicon glyphicon-arrow-down' entryId={this.props.entry.id} clicked={this.props.onMoveRowDownButtonClicked} /></td>)
    }

    if(this.props.customRowButtons && this.props.customRowButtons.length !== 0) {
      this.props.customRowButtons.forEach(x => {
        let classes = `button-${x.key}-row glyphicon glyphicon-${x.glyphicon}`
        buttons.push(
          <td key={x.key}>
            <RowButton
              classes={classes}
              entryId={this.props.entry.id}
              clicked={e => {
                let id = +e.target.getAttribute('data-entry-id')
                x.handler(id)
              }}
            />
          </td>
        )
      })
    }

    return <tr
      data-entry-id={this.props.entry.id} // hook for gui tests
      data-entry-company={this.props.entry.company} // hook for gui tests
    >{cells}{buttons}</tr>
  }
}






class Cell extends React.Component {
  render() {
    return <td>{this.props.value}{this.props.children}</td>
  }
}



class RowButton extends React.Component {
  render() {
    let classes = `btn btn-small ${this.props.classes}`

    return (
      <button
        className={classes}
        onClick={this.props.clicked}
        data-entry-id={this.props.entryId}
      ></button>
    )
  }
}



export { Table }