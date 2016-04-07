'use strict';

var hashSuffix = require('./lib/hash');
var convertToCss = require('./lib/obj-to-css');

module.exports = epistyle;

function epistyle(styles) {
  var hash = hashSuffix(styles);
  var scopedClass = '_style' + hash;
  var scoped = convertToCss({
    selector: scopedClass,
    prefix: ''
  }, styles);

  return {
    css: scoped.join('\n'),
    className: scopedClass
  };
}
