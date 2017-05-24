'use strict'



function doTheThing() {
  console.log('thing')
}

function saveToLocalStorage(data) {
  localStorage.setItem('operation-silver', data)
  let temp = localStorage.getItem('operation-silver')
  console.log(temp)
}

export { doTheThing, saveToLocalStorage }

