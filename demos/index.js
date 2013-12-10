var opts = require('optimist').argv
var slow = require('../slow-stream')(opts.slow)

slow.pipe(process.stdout)

//if(process.stderr.isTTY)
//  console.error = function () {}

module.exports = require('../')(slow, opts.diff ? require('../diff') : null)

if(!module.parent)
  console.log('USAGE: node demos/time.js 2> logfile')
