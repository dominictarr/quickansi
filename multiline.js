
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

function move(x, current) {
  x = x || 0
  return '\x1b['+ x +'G'
}

function del (i, current) {
  return '\x1b['+ i +'P'
}

function insert (n) {
  return '\x1b['+ n +'@'
}

function move(x) {
  x = x || 0
  return '\x1b['+ x +'G'
}

function moveLine(y) {
  y = y || 0
  return '\x1b['+ y +';0f'
}

function delLines (i) {
  return '\x1b['+ i +'M'
}

function insertLines (n) {
  return '\x1b['+ n +'L'
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
  }).join('')
}

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

