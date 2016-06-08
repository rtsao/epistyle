'use strict';

var epistyle = require('./');

module.exports = passthrough;

function passthrough(styles, opts) {
  var opt = opts || {};
  opt.important = (opts && typeof opts.important !== 'undefined')
    ? opts.important : true;

  var partitioned = partitionStyles(styles);
  var scoped = epistyle(partitioned.toCss, opt);

  return {
    passthrough: partitioned.valid,
    css: scoped.css,
    className: scoped.className
  };
}

/**
 * Helpers
 */

function partitionStyles(styles) {
  return Object.keys(styles).reduce(function(acc, key) {
    var val = styles[key];
    if (isValidStyleKey(key) && isValidStyleValue(val)) {
      acc.valid[key] = val;
    } else {
      acc.toCss[key] = val;
    }
    return acc;
  }, {
    valid: {},
    toCss: {}
  });
}

function isValidStyleKey(key) {
  return key.length && ':[@'.indexOf(key[0]) === -1;
}

function isValidStyleValue(val) {
  return typeof val !== 'object';
}
