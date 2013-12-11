var opts = require('optimist').argv, stream
if(opts.fast)
  stream = process.stdout
else {
  stream = require('modem-stream')(opts.baud || 300)
  stream.pipe(process.stdout)
}

require('ansi-recover')({cursor: false})

module.exports = require('../') (
  stream,
    opts.diff  ? require('../diff')
  : opts.multi ? require('../multiline')
  :              null
)

if(!module.parent)
  console.log('USAGE: node demos/marquee.js --baud $MODEM_SPEED')
