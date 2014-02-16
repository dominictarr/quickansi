var opts = require('optimist').argv, stream

if(!module.parent) {
  console.error('USAGE: node demos/marquee.js --baud $MODEM_SPEED')
}
if(opts.fast)
  stream = process.stdout
else {
  stream = require('modem-stream')(opts.baud || 30000)
  stream.pipe(process.stdout)
}

require('ansi-recover')({cursor: false})

module.exports = require('../') (stream)


