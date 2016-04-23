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
  t.deepEqual(result.passthrough, {color: 'red'});
  t.equal(result.css, '._style_1KAmyC:hover {\n  color: blue !important\n}');
  t.equal(result.className, '_style_1KAmyC');
  t.end();
});

test('empty object case', function(t) {
  var result = epistyle({});
  t.equal(result.css, '', 'no css');
  t.equal(result.className, '', 'no class name');
  t.end();
});

test('basic fallback', function(t) {
  var result = epistyle({color: 'green', foo: ['bar', 'baz']});
  t.equal(result.css, '._style_2uPGMZ {\n  color: green !important;\n  foo: baz !important;\n  foo: bar !important\n}');
  t.equal(result.className, '_style_2uPGMZ');
  t.end();
});

test('basic fallback', function(t) {
  var result = epistyle({color: 'green', ':hover': {foo: ['bar', 'baz']}});
  t.equal(result.css, '._style_2M9tSJ {\n  color: green !important\n}\n._style_2M9tSJ:hover {\n  foo: baz !important;\n  foo: bar !important\n}');
  t.equal(result.className, '_style_2M9tSJ');
  t.end();
});
