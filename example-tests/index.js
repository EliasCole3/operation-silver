import React from 'react'
import ReactDOM from 'react-dom'
import { BeerListContainer } from './components'


let Hello = () => <span>Hi</span>

ReactDOM.render(<BeerListContainer />, document.querySelector('#root'))