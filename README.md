# [posix-head](http://pubs.opengroup.org/onlinepubs/9699919799/utilities/head.html)

A POSIX-like `head` in JavaScript.

[![NPM](https://nodei.co/npm/posix-head.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/posix-head/)

[![build status](https://secure.travis-ci.org/shama/posix-head.svg)](https://travis-ci.org/shama/posix-head)
[![Build status](https://ci.appveyor.com/api/projects/status/ftvfujhco040w240)](https://ci.appveyor.com/project/shama/posix-head)
[![NPM version](https://badge.fury.io/js/posix-head.svg)](https://badge.fury.io/js/posix-head)

<!-- [![browser support][https://ci.testling.com/shama/posix-head.png]][https://ci.testling.com/shama/posix-head] -->
[![Sauce Test Status](https://saucelabs.com/browser-matrix/shama.svg)](https://saucelabs.com/u/shama)

## CLI

```shell
head -n 20 long.file
```

## API

```js
var Head = require('posix-head')
```

### `var head = new Head(argv)`
Returns a transform stream. `argv` can be:

* `_`: An array of arguments, file inputs; such as `head one.js two.js three.js`
* `fs`: Override the file system with a node/io compatible fs.
* `n`: The first number lines of each input file shall be copied to standard output. Default is 10.
* `nl`: Specify which `<newline>` character to operate with. Defaults to `\n`.

# license
(c) 2015 Kyle Robinson Young. MIT License
