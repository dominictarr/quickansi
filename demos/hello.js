var q = require('./')

var texts = [
  'hello there!',
  'Hello! there! hi, hello!',
  'Hello, world.'
]

setInterval(function () {
  var t = texts.shift()
  q(t)
  texts.push(t)
}, 1000)

