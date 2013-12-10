var opts = require('optimist').argv
var slow = require('modem-stream')(opts.baud || 300)
slow.pipe(process.stdout)

require('ansi-recover')({cursor: false})

module.exports = require('../') (
  slow,
    opts.diff  ? require('../diff')
  : opts.multi ? require('../multiline')
  :              null
)

if(!module.parent)
  console.log('USAGE: node demos/time.js 2> logfile')
