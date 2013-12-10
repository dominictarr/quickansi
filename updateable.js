var diff = require('adiff').diff


//sometimes a patch has a separate delete and insert action,
//which means we can't use the update optimization.
//detect this case, and simplify the patch.

//convert a slice style patch to an update style patch,
//for situations where there is a more efficient way to update in places when it's
//an overwrite than a splice.

module.exports = function updateableDiff (a, b) {
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

