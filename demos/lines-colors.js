require('colors')
var frames = [[
  "A",
  "B".red
], [
  "A",
  "B".red
], [
  "A",
  "B".red,
  "C".blue
], [
  "A",
  "Aa".green,
  "B".red,
  "C".blue
]]

var q = require('./'), i = 0

function next () {
  return frames[i++ % frames.length].join('\n')
}

q(next() || '')
setInterval(function () {
  q(next())
}, 300)
