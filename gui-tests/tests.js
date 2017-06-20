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
  notes: 'new notes',
  events: [
    'event1',
    'event2',
    'event3'
  ]
}

const updateEntryData = {
  company: 'update company',
  description: 'update description',
  jobTitle: 'update jobTitle',
  notes: 'update notes',
  events: [
    'udpate1',
    'udpate2',
    'udpate3'
  ]
}

const selectors = {
  arrayFieldAddButton: '.btn.btn-info.btn-add.col-xs-12'
}

describe('Operation Silver', function() {
  this.timeout(60 * 1000)
  // this.timeout(600000) // for manually testing things inside the test instance

  beforeEach(() => {
    browser.url(URL)
    browser.localStorage('POST', { key: 'operation-silver-data', value: JSON.stringify(testBase) })
    browser.localStorage('POST', { key: 'operation-silver-last-id', value: '3'})
    browser.waitForExist(`#reload-state-from-local-storage-input`, () => {
      browser.setValue('#reload-state-from-local-storage-input', 'i')
    })
  })

  it('should work', function() {
    let title = browser.getTitle()
    assert.equal(title, 'Operation Silver')
  })

  it('should work again', function() {
    let title = browser.getTitle()
    assert.notEqual(title, 'Totally not the title')
  })

  it('can create an entry using the empty table form', () => {

    // clear the existing rows so the create form will show
    browser.click('.button-delete-row')
    browser.click('.button-delete-row')
    browser.click('.button-delete-row')

    browser.setValue('#entry_company', newEntryData.company)
    browser.setValue('#entry_description', newEntryData.description)
    browser.setValue('#entry_jobTitle', newEntryData.jobTitle)
    browser.setValue('#entry_notes', newEntryData.notes)
    
    newEntryData.events.forEach((eventValue, i) => {
      browser.click(selectors.arrayFieldAddButton)
      browser.setValue(`#entry_events_${i}_value`, newEntryData.events[i])
    })

    browser.click('#entry-create-submit')
    
    browser.waitForExist(`tr[data-entry-company='${newEntryData.company}']`, () => {
      assert.equal(browser.isExisting(`tr[data-entry-company='${newEntryData.company}']`), true)
    })
  })

  it('can create an entry using the + button', () => {

    waitThenClick('#create-button-entry', () => {
      browser.waitForVisible('#entry_company', () => {
        browser.setValue('#entry_company', newEntryData.company)
        browser.setValue('#entry_description', newEntryData.description)
        browser.setValue('#entry_jobTitle', newEntryData.jobTitle)
        browser.setValue('#entry_notes', newEntryData.notes)

        newEntryData.events.forEach((eventValue, i) => {
          browser.click(selectors.arrayFieldAddButton)
          browser.setValue(`#entry_events_${i}_value`, newEntryData.events[i])
        })

        browser.click('#entry-create-submit')

        browser.waitForExist(`tr[data-entry-company='${newEntryData.company}']`, () => {
          assert.equal(browser.isExisting(`tr[data-entry-company='${newEntryData.company}']`), true)
        })
      })
    })

  })

  it('can update an entry', () => {
    waitThenClick(`button.button-update-row[data-entry-id='${testBase.data[0].id}']`, () => {
      browser.waitForVisible('#entry_company', () => {
        browser.setValue('#entry_company', updateEntryData.company)
        browser.setValue('#entry_description', updateEntryData.description)
        browser.setValue('#entry_jobTitle', updateEntryData.jobTitle)
        browser.setValue('#entry_notes', updateEntryData.notes)

        updateEntryData.events.forEach((eventValue, i) => {
          browser.setValue(`#entry_events_${i}_value`, updateEntryData.events[i])
        })

        browser.click('#entry-update-submit')

        assert.equal(browser.isExisting(`tr[data-entry-company='${updateEntryData.company}']`), true)
      })
    })

  })

  it('can delete an entry', () => {
    waitThenClick(`button.button-delete-row[data-entry-id='${testBase.data[0].id}']`, () => {
      assert.equal(browser.isExisting(`tr[data-entry-company='${testBase.data[0].company}']`), false)
    })
    // todo: update when molly guards are added
  })

  it('can column sort', () => {
    assert.equal(browser.getAttribute('#table-entry > tbody > tr:first-child', 'data-entry-id'), 1)
    browser.click(`th.column-header[name='company']`)
    assert.equal(browser.getAttribute('#table-entry > tbody > tr:first-child', 'data-entry-id'), 3)
    browser.click(`th.column-header-sorted[name='company']`)
    assert.equal(browser.getAttribute('#table-entry > tbody > tr:first-child', 'data-entry-id'), 1)
  })

  it('can re-order rows', () => {
    assert.equal(browser.getAttribute('#table-entry > tbody > tr:first-child', 'data-entry-id'), 1)
    browser.click(`button.button-move-row-up[data-entry-id='2'`)
    assert.equal(browser.getAttribute('#table-entry > tbody > tr:first-child', 'data-entry-id'), 2)
    browser.click(`button.button-move-row-up[data-entry-id='1'`)
    assert.equal(browser.getAttribute('#table-entry > tbody > tr:first-child', 'data-entry-id'), 1)
  })

  it('can search', () => {
    assert.equal(getNumberOfRowsInTable('table-entry'), 3)

    browser.setValue('#search-box-entry', 'name')
    assert.equal(getNumberOfRowsInTable('table-entry'), 3)

    browser.setValue('#search-box-entry', 'name1')
    assert.equal(getNumberOfRowsInTable('table-entry'), 1)

    browser.setValue('#search-box-entry', 'asdf')
    assert.equal(getNumberOfRowsInTable('table-entry'), 0)
    
    browser.setValue('#search-box-entry', [' ', '\uE003'])
    assert.equal(getNumberOfRowsInTable('table-entry'), 3)
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

function waitThenClick(selector, callback=null) {
  browser.waitForVisible(selector, () => {
    browser.click(selector)
    if(callback) callback()
  })
}

function getNumberOfRowsInTable(tableId) {
  return browser.$$(`#${tableId} > tbody > tr`).length
}