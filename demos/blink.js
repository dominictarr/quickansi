
var blink_on  = "in memory of the <blink> tag"
var blink_off = "in memory of the         tag"

var q = require('./'), i = 0
q(blink_on)

setInterval (function () {
  q(i++%2 ? blink_on : blink_off)
}, 500)

