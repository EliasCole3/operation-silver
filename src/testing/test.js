'use strict'

function arraymove(array, fromIndex, toIndex) {
  let newArray = JSON.parse(JSON.stringify(array))
  let element = newArray[fromIndex]
  newArray.splice(fromIndex, 1)
  newArray.splice(toIndex, 0, element)
  return newArray
}

let test1 = [
  1,
  '2',
  ['three'],
  {
    four: 'four'
  },
  {
    five: {
      five: {
        five: 'five'
      }
    }
  }
]

console.log(test1)
console.log(``)

console.log(arraymove(test1, 1, 0))
console.log(``)

console.log(arraymove(test1, 4, 3))
console.log(``)

console.log(test1)
console.log(``)