var test = require('tape')
var Head = require('../index.js')
var fs = require('./virtual-fs.js')

function assertResult(s, cb) {
  var result = ''
  s.on('data', function(data) {
    result += data.toString().replace('\r', '')
  }).on('end', function() {
    cb(result)
  })
}

test('pipe in', function(t) {
  t.plan(1)
  var head = new Head({
    fs: fs,
  })
  assertResult(head, function(result) {
    t.equal(result, '1\n2\n3\n4\n5\n6\n7\n8\n9\n')
  })
  head.write('1\n2\n3\n4\n5\n')
  head.end('6\n7\n8\n9\n10\n11\n12\n13\n')
})

test('head single file', function(t) {
  t.plan(1)
  var head = new Head({
    _: ['test/fixtures/twelve'],
    fs: fs,
  })
  assertResult(head, function(result) {
    t.equal(result, 'one\ntwo\nthree\nfour\nfive\nsix\nseven\neight\nine\nten\n')
  })
})

test('head single file with n set', function(t) {
  t.plan(1)
  var head = new Head({
    _: ['test/fixtures/twelve'],
    fs: fs,
    n: 3,
  })
  assertResult(head, function(result) {
    t.equal(result, 'one\ntwo\nthree\n')
  })
})

test('head multiple files', function(t) {
  t.plan(1)
  var head = new Head({
    _: ['test/fixtures/twelve', 'test/fixtures/four'],
    fs: fs,
  })
  assertResult(head, function(result) {
    console.log(result)
    t.equal(result, '\n==> test/fixtures/twelve <==\none\ntwo\nthree\nfour\nfive\nsix\nseven\neight\nine\nten\n\n==> test/fixtures/four <==\none\ntwo\nthree\nfour\n\n')
  })
})
