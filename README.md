# [ix-head](http://pubs.opengroup.org/onlinepubs/9699919799/utilities/head.html)

A POSIX-like `head` in JavaScript.

[![NPM](https://nodei.co/npm/ix-head.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/ix-head/)

[![build status](https://secure.travis-ci.org/shama/ix-head.svg)](https://travis-ci.org/shama/ix-head)
[![Build status](https://ci.appveyor.com/api/projects/status/9237tat1hx6dxfy2)](https://ci.appveyor.com/project/shama/ix-head)
[![NPM version](https://badge.fury.io/js/ix-head.svg)](https://badge.fury.io/js/ix-head)

<!-- [![browser support][https://ci.testling.com/shama/ix-head.png]][https://ci.testling.com/shama/ix-head] -->
[![Sauce Test Status](https://saucelabs.com/browser-matrix/shama.svg)](https://saucelabs.com/u/shama)

## CLI

```shell
head -n 20 long.file
```

## API

```js
var Head = require('ix-head')
```

### `var head = new Head(argv)`
Returns a transform stream. `argv` can be:

* `_`: An array of arguments, file inputs; such as `head one.js two.js three.js`
* `fs`: Override the file system with a node/io compatible fs.
* `n`: The first number lines of each input file shall be copied to standard output. Default is 10.
* `nl`: Specify which `<newline>` character to operate with. Defaults to `\n`.

# license
(c) 2015 Kyle Robinson Young. MIT License
