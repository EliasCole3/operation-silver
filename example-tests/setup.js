require('babel-register')()

const JSDOM = require('jsdom').JSDOM

let exposedProperties = ['window', 'navigator', 'document']
let dom = new JSDOM('')

global.window = dom.window
global.document = dom.window.document

Object.keys(document.defaultView).forEach((property) => {
  if(typeof global[property] === 'undefined') {
    exposedProperties.push(property)
    global[property] = document.defaultView[property]
  }
})

global.navigator = {
  userAgent: 'node.js'
}