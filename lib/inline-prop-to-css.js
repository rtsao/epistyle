'use strict';

var regex = /[A-Z]/g;

module.exports = function(prop) {
  return prop
    .replace(regex, '-$&').toLowerCase()
    .replace(/^ms-/, '-ms-');
}
