'use strict';

var test = require('tape');
var epistyle = require('../');
var passthrough = require('../passthrough');

test('basic usage', function(t) {
  var result = epistyle({color: 'red', ':hover': {color: 'blue'}});
  t.equal(result.css,'._style_3cbjp0 {\n  color: red !important\n}\n._style_3cbjp0:hover {\n  color: blue !important\n}');
  t.equal(result.className, '_style_3cbjp0');
  t.end();
});

test('basic passthrough usage', function(t) {
  var result = passthrough({color: 'red', ':hover': {color: 'blue'}});
  t.deepEqual(result.styles, {color: 'red'});
  t.equal(result.css, '._style_1KAmyC:hover {\n  color: blue !important\n}');
  t.equal(result.className, '_style_1KAmyC');
  t.end();
});
