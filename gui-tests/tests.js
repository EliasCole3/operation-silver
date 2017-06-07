'use strict'

const assert = require('assert')
const moment = require('moment')
const URL = 'http://localhost:3000/'
const testBase = require('./test-state.json')

describe('Operation Silver', function() {
  this.timeout(60 * 1000)
  // this.timeout(600000) // for manually testing things inside the test instance

  beforeEach(() => {
    browser.url(URL)
    browser.localStorage('POST', { key: 'operation-silver-data', value: JSON.stringify(testBase) }).value
  })

  it('should work', function() {
    // console.log(browser.localStorage('GET', 'operation-silver-data').value)
    
    let title = browser.getTitle()
    assert.equal(title, 'Operation Silver')
    browser.click('#reload-state-from-local-storage-button')
    browser.pause(60 * 1000)
  })

  it('should work again', function() {
    let title = browser.getTitle()
    assert.notEqual(title, 'Totally not the title')
  })

})

