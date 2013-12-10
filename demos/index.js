var opts = require('optimist').argv
var slow = require('../slow-stream')(opts.fast ? -1 : opts.slow)

//process.stdout.write('\u001b[?1049h\u001bc') //clear the screen
//^[[?1l^[>
//slow.pipe(process.stdout)
slow = process.stdout
//visible ? '[?25h' : '[?25l'


//I don't know how this stuff works, I got it by
//piping running vim | tee log
//and then carefully experimenting with the codes at the start and end.
//I can't find documentation on these obscure codes anywhere...

var vimStart =[  
    '^[[?1049h', //clear the screen from previous usage
//    '^[=',
    '^[[?12l', //this is needed to clear the screen
    '^[[H',    //move cursor to the top left
    '^[[?25l', //hide cursor
].join('')
.split('^[').join('\u001b')



var vimExit =
  ''
//  + '^[[25h'
//  + '^[[?1l'
//  + '^[>'
//  +  '^[[?25h' //show cursor
//  +  '^[[H'    //move cursor to the top left
  + '^[[?1049l'
  .split('^[').join('\u001b')

process.stdout.write(vimStart)
//hiding the cursor only works when output is tty,
//else the cursor disappears but never comes back
if(true || process.stdout.isTTY) {
  //process.stdout.write('\u001b[?25l') //hide cursor
  function show () {  //show cursor

//    setTimeout(function () {
      //very strange. this only works if it's in a separate write call to the final code
      process.stdout.write('\u001b[?25h') //show cursor
      process.stdout.write(vimExit)
      process.exit()
  //  })
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
