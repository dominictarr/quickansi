var diff = require('adiff').diff
var updateableDiff = require('./updateable')

/*
so, interesting discovery.

if you where on a very slow tty, it would be better to use nano that vim.
vim sends several times more control characters when entering text.

see for your self:

vim | tee test.out

nano | tee test.out

hipster | tee test.out # doesn't even work...?

*/

var stderr = process.stderr.isTTY ? function () {} : function () {
  console.error.apply(console, [].slice.call(arguments))
}

exports.diff = function (a, b) {
  return updateableDiff(a.split(''), b.split(''))
}

function move(x, current) {
  x = x || 0
  return '\u001b['+ x +'G'
}

function del (i, current) {
  return '\u001b['+ i +'P'
}

function backspace (n) {
  var s = ''
  while(n--)
    s += '\u001bH\u001b[1P'
  return s
}

function insert (n) {
  return '\u001b['+ n +'@'
}

function log(name, str) {
  stderr(name, JSON.stringify(str))
  return str
}


function applyChars (patch) {
  var next = 0
  return patch.map(function (op) {
    return (op.at === next++ ? '' : move(next = op.at + 1)) +
      ( op.type === 'update' ? op.value
      : op.type === 'delete' ? del(op.value)
      :                        insert(op.value.length) + op.value.join(''))
      
//    if(op.type === 'update')
//      return  + op.value
//    if(op.type === 'delete')
//      return move(op.at + 1) + del(op.value)
//    if(op.type === 'insert')
//      return move(op.at + 1) + insert(op.value.length) + op.value.join('')

  }).join('')
}

exports.apply = applyChars
