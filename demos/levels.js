

var lines = 5
var max = 20

function pad (n, str) {
  var s = n.toString()
  return str.substring(0, str.length - s.length) + s
}

function bar(char, current, max) {
  var s = ''
  for(var i = 0; i < max; i++)
    s += i < current ? char : '.'
  s +=  pad(current, '   ')
  return s
}

function genGraphs () {
  return [
    'QUESTIONS : ' + bar('?', ~~(Math.random() * max), max),
    'STARS     : ' + bar('*', ~~(Math.random() * max), max),
    'SURPRISES : ' + bar('!', ~~(Math.random() * max), max),
    'NUMBERS   : ' + bar('#', ~~(Math.random() * max), max)
  ].join('\n')
}

var q = require('./')

q(genGraphs())

setInterval(function () {
  q(genGraphs())
}, 300)
