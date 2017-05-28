import React, { Component } from 'react'
const moment = require('moment')


class Class1 extends React.Component {

  constructor(props) {
    // console.log('Class1 being constructed')
    super(props)
    this.state = {
      date: new Date(),
      momentDate: moment()
    }
  }

  getDateProperties() {
    let temp = []
    Object.getOwnPropertyNames(this.state.date.__proto__).forEach(x => {
      temp.push(x)
    })
    temp.sort().join(', ')
    return temp
  }

  componentWillMount() {
    // console.log(`Class1: componentWillMount()`)
  }

  render() {
    // console.log(`Class1 rendering`)
    return <div>
      Class1 <br />

      {/*{this.getDateProperties()}*/}

      Created: {this.state.momentDate.format('hh:mm:ssa MM.DD.YYYY')}
    </div>
  }

  componentDidMount() {
    // console.log(`Class1: componentDidMount()`)
  }

  componentWillUnmount() {
    // console.log(`Class1: componentWillUnmount()`)
  }

}

class Class2 extends React.Component {
  render() {
    return <div>Class2</div>
  }
}

class Class3 extends React.Component {
  render() {
    return <div>Class3</div>
  }
}

export { Class1, Class2, Class3 }