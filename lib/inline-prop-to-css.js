'use strict';

var uppercasePattern = /[A-Z]/g;
var msPattern = /^ms-/;

function hyphenateStyleName(prop) {
  return prop
    .replace(uppercasePattern, '-$&')
    .toLowerCase()
    .replace(msPattern, '-ms-');
}

module.exports = hyphenateStyleName;
