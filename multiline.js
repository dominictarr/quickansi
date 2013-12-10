

var diff  = require('adiff').diff


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

//convert a slice style patch to an update style patch,
//for situations where there is a more efficient way to update in places when it's
//an overwrite than a splice.
function updateableDiff (a, b) {
  var changes = []
  diff(a, b).forEach(function (_patch) {
    var patch = _patch.slice()
    var index = patch.shift()
    var deletes = patch.shift()
    var inserts = patch
    //find updates, so we can diff the lines internally
    var i = 0
    var M = Math.min(deletes, inserts.length)
    for(; i < M; i++) {
      //these lines are updates
      changes.push({type: 'update', at: index + i, value: inserts[i], oldValue: a[index + i]})
    }
    if(inserts.length > deletes)
      changes.push({type: 'insert', at: index + i, value: inserts.slice(i)})
    else if(deletes > inserts.length) {
      changes.push({type: 'delete', at: index + inserts.length, value: deletes - inserts.length})
    }
  })
  return changes
}


if(!module.parent) {
  var inspect = require('util').inspect
  console.error(inspect(exports.diff('Hello\nthere\n.', '!HellO\n~/~\nthere'), {depth: 10}))
}
