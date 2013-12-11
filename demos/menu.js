
var frames = [[
  '~ SHOPPING LIST ~',
  '',
  '*[vege]',
  '* fruit',
  '* other stuff'
], [
  '~ SHOPPING LIST ~',
  '',
  '* vege',
  '*[fruit]',
  '* other stuff'
], [
 '~ SHOPPING LIST ~',
  '',
  '* vege',
  '* fruit',
  '  -[apple]',
  '  - banana',
  '  - cherry',
  '  - durian',
  '  - elderberry',
  '* other stuff',
], [
 '~ SHOPPING LIST ~',
  '',
  '* vege',
  '* fruit',
  '  - apple',
  '  -[banana]',
  '  - cherry',
  '  - durian',
  '  - elderberry',
  '* other stuff',
], [
 '~ SHOPPING LIST ~',
  '',
  '* vege',
  '* fruit',
  '  - apple',
  '  - banana',
  '  -[cherry]',
  '  - durian',
  '  - elderberry',
  '* other stuff',
], [
 '~ SHOPPING LIST ~',
  '',
  '* vege',
  '* fruit',
  '  - apple',
  '  - banana',
  '  - cherry',
  '  -[durian]',
  '  - elderberry',
  '* other stuff',
], [
 '~ SHOPPING LIST ~',
  '',
  '* vege',
  '* fruit',
  '  - apple',
  '  - banana',
  '  - cherry',
  '  - durian',
  '  -[elderberry]',
  '* other stuff',
], [
 '~ SHOPPING LIST ~',
  '',
  '* vege',
  '* fruit',
  '  - apple',
  '  - banana',
  '  - cherry',
  '  - durian',
  '  -[elderberry] <!!!>',
  '* other stuff',
]]

var q = require('./'), i = 0

function next () {
  return frames[i++ % frames.length].join('\n')
}

q(next())
setInterval(function () {
  q(next())
}, 150)
