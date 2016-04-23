# epistyle

[![build status][build-badge]][build-href]
[![dependencies status][deps-badge]][deps-href]
[![npm version][npm-badge]][npm-href]

Enhanced inline style objects

## Usage

```js
const epistyle = require('epistyle/passthrough');

const {passthrough, css, className} = epistyle({
  color: 'red',
  ':hover': {
    color: ['rgba(0,75,255,0.8)', 'blue']
  }
});

console.log(passthrough);
// => {color: "red"}

console.log(css);
// => "._style_2wKC1:hover {\n  color: blue !important;\n  color: rgba(0,75,255,0.8) !important\n}"

console.log(className);
// => "_style_2wKC1"
```

[build-badge]: https://travis-ci.org/rtsao/epistyle.svg?branch=master
[build-href]: https://travis-ci.org/rtsao/epistyle
[deps-badge]: https://david-dm.org/rtsao/epistyle.svg
[deps-href]: https://david-dm.org/rtsao/epistyle
[npm-badge]: https://badge.fury.io/js/epistyle.svg
[npm-href]: https://www.npmjs.com/package/epistyle
