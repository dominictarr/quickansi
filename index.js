var updateableDiff = require('./updateable')
var split = require('./colors')

//TODO: split with colours applied,
//so that colours work right across lines.

function toLines (a) {
  return split.lines(split(a))
}

function toChars (a) {
  return a
}

function move (x, current) {
  x = x || 0
  return '\x1b['+ x +'G'
}

function del (i, current) {
  return '\x1b['+ i +'P'
}

function insert (n) {
  return '\x1b['+ n +'@'
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

function join(ary, s) {
  return ary.join('string' === typeof s ? s : '')
}

function applyChars (patch) {
  var next = 0
  return patch.map(function (op) {
    return (op.at === next++ ? '' : move(next = op.at + 1)) +
      ( op.type === 'update' ? op.value
      : op.type === 'delete' ? del(op.value)
      :                        insert(op.value.length) + join(op.value))
  }).join('')
}

function applyLines (patch) {
  var next = 0
  return patch.map(function (op) {
    return moveLine (op.at + 1) +
      ( op.type === 'update' ? applyChars(op.value)
      : op.type === 'delete' ? delLines(op.value)
      :                        insertLines(op.value.length)
                                + op.value.map(join).join('\n'))
  }).join('')
}

var apply = applyLines

function diff (a, b) {
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

function quick (stdout) {
  stdout = stdout || process.stdout
  var current = ''
  return function update (a) {
    if(!current)
      stdout.write(current = a)
    else {
      var patch = diff(current, current = a)
      stdout.write(apply(patch))
    }
  }
}

exports = module.exports = quick
exports.diff = diff
exports.apply = applyLines

