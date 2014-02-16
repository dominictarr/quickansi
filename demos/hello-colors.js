var q = require('./')
require('colors')
var texts = [
  'hello ' + 'there!'.red,
  'Hello'.blue + ' there! hi, ' + 'hello!'.yellow,
  'Hello, ' + 'world'.green + '.'
]

setInterval(function () {
  var t = texts.shift()
  q(t)
  texts.push(t)
}, 1000)

