var Transform = require('readable-stream/transform')
var inherits = require('inherits')
var xtend = require('xtend')
var nextTick = require('next-tick')

function Head(argv) {
  if (!(this instanceof Head)) return new Head(argv)
  var self = this
  Transform.call(self)
  this.params = xtend({
    _: [],
    n: 10,
    nl: '\n'
  }, argv)
  this._lines = 0
  Object.defineProperty(self, 'fs', {
    get: function() { return self.params.fs || require('fs') }
  })
  if (self.params._.length > 0) {
    nextTick(function() {
      var rs, filename
      var files = self.params._.slice(0)
      if (files.length === 1) {
        rs = self._readFile(files[0])
        rs.on('end', self.end.bind(self))
      } else {
        readFiles()
      }
      function readFiles() {
        filename = files.shift()
        if (!filename) {
          self.end()
          return
        }
        self.write(self.params.nl + '==> ' + filename + ' <==')
        rs = self._readFile(filename)
        rs.on('end', readFiles)
      }
    })
  }
}
module.exports = Head
inherits(Head, Transform)

Head.prototype._readFile = function(filename) {
  var self = this
  var fs = self.fs
  self._lines = 0
  var rs = fs.createReadStream(filename)
  rs.on('error', function(err) {
    self.emit('error', err)
  })
  rs.on('data', function(data) {
    self.write(data)
  })
  return rs
}

Head.prototype._transform = function(chunk, enc, cb) {
  var data = chunk.toString().split(this.params.nl)
  var need = this.params.n - this._lines
  if (need < 1) return cb(null, null)

  var end = data.length
  if (end > need) end = need

  this._lines += end
  data = data.slice(0, end).join(this.params.nl) + this.params.nl
  //console.log('after', this._lines, need)
  cb(null, data)
}
