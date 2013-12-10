var diff = require('adiff').diff

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
  return diff(a.split(''), b.split(''))
}

function move(x, current) {
  x = x || 0
  return '\u001b['+ x +'G'
}

function del (i, current) {
  //var s = ''
//  while(i)
    return '\u001b['+(i--)+'P'
//  return s
}

function backspace (n) {
  var s = ''
  while(n--)
    s += '\u001bH\u001b[1P'
  return s
}

function insert (n) {
  return '\u001b['+n+'@'
}

function log(name, str) {
  stderr(name, JSON.stringify(str))
  return str
}

exports.apply = function (a, current) {
  return a.map(function (e) {
    var index = e.shift()
    var deletes = e.shift()
    var chars = e.join('')
    if(deletes == chars.length) //straight forward replace
      return log('REPLACE', move(index + 1) + chars)
    else if(deletes > chars.length) {      
      return log('DELETE', move(index + 1) + del(deletes - chars.length) + chars)
    }
    else if(deletes < chars.length) {
      var inserts = chars.length - deletes
      return log('INSERT', move(index + 1) + insert(inserts) + chars)
    }
  }).join('')
}
