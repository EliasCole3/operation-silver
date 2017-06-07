'use strict'

const assert = require('assert')
const moment = require('moment')
// const URL = 'file:///Users/elias.cole/Code/Oras/index.html'
// const URL = 'file:///Users/elias.cole/Code/Oras\ Piniks/dist-test/index.html'
const URL = 'http://localhost:3000/'
const testBase = require('./test-state.json')

describe('Operation Silver', function() {
  this.timeout(60 * 1000)
  // this.timeout(600000) // for manually testing things inside the test instance

  beforeEach(() => {
    // before(() => {
    browser.url(URL)
    // browser.localStorage('POST', { key: 'oras-state-testing', value: JSON.stringify(testBase) }).value
  })

  it('should work', function() {
    // console.log(browser.localStorage('GET', 'oras-state-testing').value)
    let title = browser.getTitle()
    assert.equal(title, 'Operation Silver')
  })

  it('should work again', function() {
    let title = browser.getTitle()
    assert.notEqual(title, 'Totally not the title')
  })

  // it('should have an empty summary section', function() {
  //   let summaryText = browser.getText('#summary')
  //   assert.equal(summaryText, '')
  // })

  // it('should be able to add a day', function() {
  //   let containerText = browser.getText('#container')
  //   setWeekToTestWeek(browser)
  //   addTestDay(browser)
  //   assert.equal(browser.isExisting('#day-06-16-16'), true)
  // })

  // it('should be able to delete a day', function() {
  //   let containerText = browser.getText('#container')
  //   setWeekToTestWeek(browser)
  //   addTestDay(browser)
  //   assert.equal(browser.isExisting('.day-delete-button[data-day="06-16-16"'), true)
  //   browser.click('.day-delete-button[data-day="06-16-16"')
  //   browser.waitForVisible('#modal-title-small', 2000)
  //   browser.click('#modal-delete-day-yes')
  //   assert.equal(browser.isExisting('.day-delete-button[data-day="06-16-16"'), false)
  // })

  // it('shouldn\'t have an empty summary section after clicking \'Week Summary\'', function() {
  //   let summaryText = browser.getText('#summary')
  //   assert.equal(summaryText, '')
  //   addToday(browser)
  //   browser.click('#week-summary-button')
  //   summaryText = browser.getText('#summary')
  //   assert.notEqual(summaryText, '')
  // })

  // it('should have test values', function() {
  //   setWeekToTestWeek(browser)
  //   // browser.pause(7000)
  //   assert.equal(browser.isExisting('#asdf16'), false)
  //   assert.equal(browser.isExisting('#day-06-14-16'), true)
  // })

  // it('should be able to show view 1', function() {
  //   setWeekToTestWeek(browser)
  //   browser.click('#show-view-1')
  //   browser.element('#view-1-table').waitForVisible(3000)
  //   assert.equal(browser.isExisting('#view-1-table'), true)
  // })

  // it('should be able to create an entry', function() {
  //   setWeekToTestWeek(browser)
  //   createEntry(browser)
  //   assert.equal(browser.isExisting(getTestEntryDeleteButtonSelector()), true)
  // })

  // it('should be able to delete an entry', function() {
  //   setWeekToTestWeek(browser)
  //   createEntry(browser)
  //   let entryDeleteButton = getTestEntryDeleteButtonSelector()
  //   assert.equal(browser.isExisting(entryDeleteButton), true)
  //   browser.click(entryDeleteButton)
  //   browser.waitForVisible('#modal-title-small', 2000)
  //   browser.click('#modal-delete-entry-yes')
  //   browser.element(entryDeleteButton).waitForVisible(3000, true) // 2nd param == reverse, aka .waitForInvisible()
  //   assert.equal(browser.isExisting(entryDeleteButton), false)
  // })

  // it('should be able to add a category', function() {
  //   setWeekToTestWeek(browser)
  //   browser.setValue('#category-input', 'Test Category')
  //   browser.click('#add-category')

  //   // two different ways of testing for node existence, in addition to the one used above
  //   let doesExist1 = browser.waitForExist('option[value=\'Test Category\']')
  //   let doesExist2 = browser.elements('option[value=\'Test Category\']')
  //   assert.equal(doesExist1, true)
  //   assert.notEqual(doesExist2.value.length, 0)
  // })

  // it('should be able to finish a day', function() {
  //   setWeekToTestWeek(browser)
  //   assert.equal(browser.isExisting('li.new-entry[data-day="06-15-16"]'), true)
  //   browser.click('.day-done-button[data-day="06-15-16"')
  //   assert.equal(browser.isExisting('li.new-entry[data-day="06-15-16"]'), false)
  // })

  // it('should have appropriate values after clicking the day summary button', function() {
  //   setWeekToTestWeek(browser)

  //   let summaryText = browser.getText('#summary')
  //   assert.equal(summaryText, '')

  //   browser.click('.day-summary-button[data-day="06-14-16"]')
  //   summaryText = browser.getText('#summary')
  //   assert.equal(summaryText, day1Summary)

  //   browser.click('.day-summary-button[data-day="06-15-16"]')
  //   summaryText = browser.getText('#summary')
  //   assert.equal(summaryText, day2Summary)
  // })

  // it('should have appropriate values after clicking the week summary button', function() {
  //   setWeekToTestWeek(browser)
  //   let summaryText = browser.getText('#summary')
  //   assert.equal(summaryText, '')
  //   browser.click('#week-summary-button')
  //   summaryText = browser.getText('#summary')
  //   assert.equal(summaryText, weekSummary)
  // })

  // it('should have molly guarding on entry delete', function() {
  //   setWeekToTestWeek(browser)
  //   browser.click(getTestEntryDeleteButtonSelector2())
  //   browser.waitForVisible('#modal-title-small', 2000)
  //   assert.equal(browser.isExisting('#modal-title-small'), true)
  // })

  // it('should have molly guarding on day delete', function() {
  //   setWeekToTestWeek(browser)
  //   browser.click('.day-delete-button[data-day="06-15-16"')
  //   browser.waitForVisible('#modal-title-small', 2000)
  //   assert.equal(browser.isExisting('#modal-title-small'), true)
  // })

})



function getTestEntryDeleteButtonSelector() {
  let day = '06-15-16'
  let start = '11:15 AM'
  let entryId = moment(day + start, 'MM-DD-YYhh:mm A').format('x')
  let entryDeleteButton = `.entry-delete-button[data-day="06-15-16"][data-entry-id="${entryId}"]`
  return entryDeleteButton
}

function getTestEntryDeleteButtonSelector2() {
  let day = '06-15-16'
  let start = '09:15 AM'
  let entryId = moment(day + start, 'MM-DD-YYhh:mm A').format('x')
  let entryDeleteButton = `.entry-delete-button[data-day="06-15-16"][data-entry-id="${entryId}"]`
  return entryDeleteButton
}

function createEntry(browser) {
  browser.setValue('.new-entry-start-picker[data-day="06-15-16"]', '11:15 AM')
    .setValue('.new-entry-end-picker[data-day="06-15-16"]', '11:45 AM')
    .setValue('.new-entry-description[data-day="06-15-16"]', 'asdf')
    .click('.new-entry-button[data-day="06-15-16"]')
}

function addToday(browser) {
  browser.click('#new-day-picker')
    .click('body')
    .click('#new-day-button')
}

function addTestDay(browser) {
  browser.setValue('#new-day-picker', '06-16-16')
    .click('body')
    .click('#new-day-button')
}

function setWeekToTestWeek(browser) {
  let input = browser.element('#week-start-picker')
  input.waitForValue(1000)
  browser.click('#week-start-picker')
  browser.setValue('#week-start-picker', '06-13-16')
    .setValue('#week-end-picker', '06-17-16')
    .click('body')
}

// these are here for the proper whitespacing
let day1Summary = `{
  "Bench - Other": 2.5,
  "Lunch": 1,
  "total": 2.5
}`

let day2Summary = `{
  "Bench - Other": 2.25,
  "total": 2.25
}`

let weekSummary = `[
  {
    "Bench - Other": 2.5,
    "Lunch": 1,
    "total": 2.5
  },
  {
    "Bench - Other": 2.25,
    "total": 2.25
  }
]`



// browser.pause(9000)
// console.log(browser.localStorage('GET', 'oras-state-testing').value)
// browser.screenshot()
// browser.saveScreenshot('./snapshot.png')

// browser.waitUntil(function() {
//   let value = browser.execute(function() {
//     return window.localStorage('oras-state-testing')
//   })
//   // return browser.localStorage('GET', 'oras-state-testing').value !== undefined
//   return value !== undefined
// }, 5000, 'message')