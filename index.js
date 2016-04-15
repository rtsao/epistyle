'use strict';

var hashSuffix = require('./lib/generate-suffix');
var convertToCss = require('./lib/obj-to-css');

module.exports = epistyle;

function epistyle(styles) {
  if (!Object.keys(styles).length) {
    return {css: '', className: ''};
  }

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
