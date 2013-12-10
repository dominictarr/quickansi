
var frames = [[
  "A",
  "B"
], [
  "A",
  "B"
], [
  "A",
  "B",
  "C"
], [
  "A",
  "Aa",
  "B",
  "C"
]]

var q = require('./'), i = 0

function next () {
  return frames[i++ % frames.length].join('\n')
}

q(next() || '')
setInterval(function () {
  q(next())
}, 300)
