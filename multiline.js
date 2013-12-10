
var updateableDiff = require('./updateable')

function toLines (a) {
  return a.split('\n')
}

function toChars (a) {
  return a.split('')
}

exports.diff = function (a, b) {
  var _a = toLines(a)
  var _b = toLines(b)

  return updateableDiff(_a, _b).map(function (e) {
    if(e.type !== 'update') return e
    return {
      type: 'update', at: e.at,
      value: updateableDiff(toChars(e.oldValue), toChars(e.value))
    }
  })
}

function move(x) {
  x = x || 0
  return '\u001b['+ x +'G'
}

function moveLine(y) {
  y = y || 0
  return '\u001b['+ y +';0f'
}

function delLines (i) {
  return '\u001b['+ i +'M'
}

function insertLines (n) {
  return '\u001b['+ n +'L'
}

function log(name, str) {
  stderr(name, JSON.stringify(str))
  return str
}


var applyChars = require('./diff').apply

function applyLines (patch) {
  return patch.map(function (op) {
    if(op.type === 'update')
      return moveLine(op.at + 1) + applyChars(op.value)
    if(op.type === 'delete')
      return moveLine(op.at + 1) + delLines(op.value)
    if(op.type === 'insert')
      return moveLine(op.at + 1) + insertLines(op.value.length) + op.value.join('\n')
  }).join('')
}

exports.apply = applyLines

if(!module.parent) {
  var inspect = require('util').inspect
  console.error(inspect(exports.diff('Hello\nthere\n.', '!HellO\n~/~\nthere'), {depth: 10}))
}
