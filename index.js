'use strict';

var hashSuffix = require('./lib/generate-suffix');
var convertToCss = require('./lib/obj-to-css');

module.exports = epistyle;

function epistyle(styles, opts) {
  if (!Object.keys(styles).length) {
    return {css: '', className: ''};
  }

  var root = (opts && typeof opts.root !== 'undefined')
    ? opts.root : '_style';
  var important = (opts && typeof opts.important !== 'undefined')
    ? opts.important : false;
  var hash = (opts && typeof opts.hash !== 'undefined')
    ? opts.hash : hashSuffix(styles);
  var prefix = (opts && typeof opts.prefix !== 'undefined')
    ? opts.prefix : '';

  var scopedClass = root + hash;
  var scoped = convertToCss({
    selector: scopedClass,
    prefix: prefix
  }, styles, '', important);

  return {
    css: scoped.join('\n'),
    className: scopedClass
  };
}
