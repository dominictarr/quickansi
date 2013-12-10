
var through = require('through')

//make the bytes trickle through like molasses
//
module.exports = function (speed) {
  var t
  return t = through(function (data) {
    data.split('').forEach(function (c) {
      t.queue(c)
    })
  }).on('data', function () {
    if(speed == -1) return
    t.pause()
    setTimeout(function () {
      t.resume()
    }, isNaN(speed) ? 1000/(300/8) : speed)
    // ^ as slow as a 300 baud modem
    // (read: "underground" by Suelette Dreyfus. http://www.underground-book.net/)
  })
}
