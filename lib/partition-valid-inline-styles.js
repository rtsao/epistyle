'use strict';

module.exports = partitionStyles;

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
