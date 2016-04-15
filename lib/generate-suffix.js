'use strict';

var encode = require('./base62-encode');
var hash = require('./hash-string');

module.exports = function hashSuffix(obj) {
  return '_' + encode(hash(JSON.stringify(obj)));
}
