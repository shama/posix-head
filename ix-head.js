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
        self.write(self.params.nl + '==> ' + filename + ' <==' + self.params.nl)
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
  var lines = 0
  var nlrg = new RegExp(self.params.nl, 'g')
  var rs = fs.createReadStream(filename)
  rs.on('error', function(err) {
    self.emit('error', err)
  })
  rs.on('data', function(data) {
    var l = data.toString().split(self.params.nl)
    var need = self.params.n - lines
    if (need < 1) {
      rs.emit('end')
      return
    }
    var out = l.slice(0, need).join(self.params.nl) + self.params.nl
    self.write(out)
  })
  return rs
}

Head.prototype._transform = function(chunk, enc, cb) {
  this.push(chunk)
  cb()
}
