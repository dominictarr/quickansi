

var message = require('optimist').argv.message || 'node marquee.js --message "YOUR MESSAGE HERE"'
var q = require('./')
message = message + '   '

setInterval(function () {
  q(message)
  message = message.substring(1) + message[0]
}, 50)
