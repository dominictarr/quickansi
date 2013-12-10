var opts = require('optimist').argv
var slow = require('../slow-stream')(opts.fast ? -1 : opts.slow)

process.stdout.write('\u001bc') //clear the screen
slow.pipe(process.stdout)

//visible ? '[?25h' : '[?25l'

//hiding the cursor only works when output is tty,
//else the cursor disappears but never comes back
if(process.stdout.isTTY) {
  process.stdout.write('\u001b[?25l') //hide cursor
  function show () {  //show cursor
    console.log('\u001b[?25h')
    process.exit()
  }
  process.on('exit', show).on('SIGINT', show).on('SIGTERM', show)
}
module.exports = require('../') (
  slow,
    opts.diff  ? require('../diff')
  : opts.multi ? require('../multiline')
  :              null
)

if(!module.parent)
  console.log('USAGE: node demos/time.js 2> logfile')
