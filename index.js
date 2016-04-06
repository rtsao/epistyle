'use strict';

var hashSuffix = require('./lib/hash');
var partitonStuff = require('./lib/partition-valid-inline-styles');
var convertToCss = require('./lib/obj-to-css');

module.exports = epistyle;

function epistyle(styles) {
  var partitioned = partitonStuff(styles);

  var toCss = partitioned.toCss;
  var suffix = hashSuffix(toCss);

  var scopedClass = '_style' + suffix;

  var scoped = convertToCss({
    selector: scopedClass,
    prefix: ''
  }, toCss);

  return {
    styles: partitioned.valid,
    css: scoped.join('\n'),
    className: scopedClass
  };
}
