'use strict'

const assert = require('assert')
const moment = require('moment')
const URL = 'http://localhost:3000/'

// silo'd and old
// const testBase = require('./test-state.json')

// grabbing the same test data the app uses
import { data as testBase } from './../src/sample-data/data1.js'

const newEntryData = {
  company: 'new company',
  description: 'new description',
  jobTitle: 'new jobTitle',
  notes: 'new notes'
}

const updateEntryData = {
  company: 'update company',
  description: 'update description',
  jobTitle: 'update jobTitle',
  notes: 'update notes'
}

describe('Operation Silver', function() {
  this.timeout(60 * 1000)
  // this.timeout(600000) // for manually testing things inside the test instance

  beforeEach(() => {
    browser.url(URL)
    browser.localStorage('POST', { key: 'operation-silver-data', value: JSON.stringify(testBase) })
    browser.localStorage('POST', { key: 'operation-silver-last-id', value: '3'})
    browser.click('#reload-state-from-local-storage-button')
  })

  it('should work', function() {
    let title = browser.getTitle()
    assert.equal(title, 'Operation Silver')
  })

  it('should work again', function() {
    let title = browser.getTitle()
    assert.notEqual(title, 'Totally not the title')
  })

  it('can create an entry', () => {
    let tabs = determineTabs()
    tabs['New'].click()
    browser.setValue('#new-form-company', newEntryData.company)
    browser.setValue('#new-form-description', newEntryData.description)
    browser.setValue('#new-form-job-title', newEntryData.jobTitle)
    browser.setValue('#new-form-notes', newEntryData.notes)
    browser.click('#submit-new-entry')
    tabs['Table'].click()

    browser.waitForExist(`tr[data-entry-company='${testBase.data[0].company}']`, () => {
      assert.equal(browser.isExisting(`tr[data-entry-company='${newEntryData.company}']`), true)
    })
  })

  it('can update an entry', () => {
    browser.click(`button.button-update-row[data-entry-id='${testBase.data[0].id}']`)

    browser.setValue('#update-form-company', updateEntryData.company)
    browser.setValue('#update-form-description', updateEntryData.description)
    browser.setValue('#update-form-job-title', updateEntryData.jobTitle)
    browser.setValue('#update-form-notes', updateEntryData.notes)
    browser.click('#submit-updated-entry')

    assert.equal(browser.isExisting(`tr[data-entry-company='${updateEntryData.company}']`), true)
  })

  it('can delete an entry', () => {
    browser.click(`button.button-delete-row[data-entry-id='${testBase.data[0].id}']`)

    // todo: update when molly guards are added

    assert.equal(browser.isExisting(`tr[data-entry-company='${testBase.data[0].company}']`), false)
  })

})




/*

Toolbox
--------------------------------------
browser.pause(60 * 1000)
browser.getText('SELECTOR')
browser.click('SELECTOR')
browser.waitForVisible('SELECTOR', 2000)
browser.setValue('SELECTOR', 'TEXT')
browser.element('SELECTOR').waitForValue(1000)
browser.screenshot()
browser.saveScreenshot('./snapshot.png')

assert.equal(browser.isExisting('SELECTOR'), true)
assert.equal(title, 'VALUE')

browser.localStorage('GET', 'operation-silver-data').value
browser.localStorage('POST', { key: 'operation-silver-data', value: JSON.stringify(testBase) })
--------------------------------------

*/

function determineTabs() {
  let obj = {}
  let tabNodes = $$('.tabs-menu-item')
  tabNodes.forEach(x => {
    obj[x.$('a').getText()] = $$('.tabs-menu-item')[x.index]
  })
  return obj
}