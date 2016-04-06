'use strict';

var test = require('tape');
var epistyle = require('../');

test('basic usage', function(t) {
  var result = epistyle({color: 'red', ':hover': {color: 'blue'}});
  t.deepEqual(result.styles, {color: 'red'});
  t.equal(result.css, '._style_1KAmyC:hover {\n  color: blue\n}');
  t.equal(result.className, '_style_1KAmyC');
  t.end();
});
