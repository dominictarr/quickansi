//generate patches to strings, which can be used to update ansi terminals!
var multi = require('./multiline')

var stderr = process.stderr.isTTY ? function () {} : function (value) {
  var inspect = require('util').inspect
  console.error(inspect(value, {depth: 10}))
}

function diff (a, b) {
 var changes = []
  //iterate over a, b
  var M = Math.max(a.length, b.length)
  for(var i = 0; i < M; i++) {
    if(a[i] && !b[i])
      changes.push([+i, ' '])
    else if(a[i] != b[i])
      changes.push([+i, b[i]])
  }
    
  return changes
}

function apply (patch) {
  var p = 0
  return patch.map(function (e) {
    var n = e[0]
    var c = e[1]
    return n === ++p ? c : move((p=n) + 1) + c
  }).join('')
}

function move(x, current) {
  x = x || 0
  return '\x1b['+ x +'G'
}

function del (i, current) {
//  return ''

  var s = ''
  while(i--)
    s += '\x1b[3~'
  return s
}

function quick (stdout, opts) {
  stdout = stdout || process.stdout
  stdout.write(move())
  opts = opts || multi
  var current = ''
  return function update (a) {
//    stdout.write(move(0, 0))
    if(!current)
      stdout.write(current = a)
    else {
      var patch = opts.diff(current, current = a) //diff(current.split(''), (current = a).split(''))
      stderr(patch)
      stdout.write(opts.apply(patch))
    }
  }
}

/*
#okay, cool trick
> nano | tee out
#then, in another terminal
> tail -f | cat -v
# this shows the raw output of nano.
# if you left off cat -v then it would
# show a duplicate of nano!
*/
module.exports = quick

