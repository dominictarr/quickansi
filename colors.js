
// PLAN TO HANDLE COLORS.

//split by characters, with any color codes prepended.
//this will properly, and the array will have the same indexes
//as the screen...

//no that doesn't work if you have a region that changes colour
//but not text.

//the simplest solution is to split into chars & codes,
//and then wrap every character with any codes that applies to it.

//TODO: dewrap unnecessary codes before writing out.
//currently the color codes are written out around each char
//which aplifies writes about 8x for colored characters.

exports = module.exports = function (string) {
  console.error('split', string)
  //return string
  return exports.group(exports.split(string))
}

var splitWithColor = exports.split = function (string) {
  var parts = []
  var c, l = string.length
  for(var i = 0; i < l; i++) {
    var c = ''
    if(string[i] === '\x1b') { //ansi escape sequence begins
      c = '\x1b'
      if('[' === string[++i]) {
        c += '['
        var n 
        do {
          c += (n =string[++i]) //colour codes always end in an 'm'
        } while(('0' <= n && n <= 9) || n == ';');
      } else { //some sequences end immediately
        c+=string[i]
      }
    }
    
    parts.push(c || string[i])
  }
  return parts
}

var groups = exports.group = function (tokens) {
  var groups = []
  var open = '', close = ''
  for(var i = 0; i < tokens.length; i++) {
    var token = tokens[i]
    if(token.length > 1) { //it's escaped
      if(/^\u001b\[3[0-8]m$/.test(token)) {
        open = token
        close = '\u001b[39m'
      } else
        close = open = ''
    }
    else if(token === '\n')
      groups.push('\n')
    else
      groups.push(open + token + close)
  }
  return groups
}

var lines =  exports.lines = function (tokens) {
  var lines = []
  var current = []
  for(var i = 0; i < tokens.length; i++) {
    if(tokens[i] === '\n')
      lines.push(current), current = []
    else
      current.push(tokens[i])
  }
  lines.push(current)
  return lines
}

if(!module.parent) {
  require('colors')
  var s = 'why'.yellow + '-'+'hello'.underline.inverse.bold + '-' + 'rainbow'.rainbow
  var colors = splitWithColor(s)
  console.error(s)
  console.error(colors)
  console.error(groups(colors))
  //colors are 3x, closed by 39
}
