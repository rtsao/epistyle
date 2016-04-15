'use strict';

var epistyle = require('./');
var partitonStuff = require('./lib/partition-valid-inline-styles');

module.exports = passthrough;

function passthrough(styles) {
  var partitioned = partitonStuff(styles);
  var scoped = epistyle(partitioned.toCss);

  return {
    passthrough: partitioned.valid,
    css: scoped.css,
    className: scoped.className
  };
}
