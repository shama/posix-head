var fs = module.exports = {}
var Readable = require('readable-stream/readable')
var inherits = require('inherits')

var data = {
  'test/fixtures/twelve': 'one\ntwo\nthree\nfour\nfive\nsix\nseven\neight\nine\nten\neleven\ntwelve\n',
  'test/fixtures/four': 'one\ntwo\nthree\nfour\n',
}

function VFile(filename) {
  Readable.call(this)
  this.filename = filename
}
inherits(VFile, Readable)

VFile.prototype._read = function() {
  this.push(data[this.filename])
  this.push(null)
}

fs.createReadStream = function(filename) {
  return new VFile(filename)
}
