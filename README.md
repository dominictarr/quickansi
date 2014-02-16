# quickansi

convert key frame strings into minimal ansi escape code sequences,
to effiently update the screen.


## Example

wrap a stream, then tell it what the each frame should be.

``` js
var quickansi = require('quickansi')
var update = quickansi(process.stdout)

//tell 
update('hello!')

setTimeout(function () {
  //when there is a partial change,
  //only the new characters are added
  //for flicker free animated ascii art!
  update('hello, WORLD!')
}, 500)
```

Ansi color codes are also supported, just add colors to the string!

## License

MIT
