'use strict';

var dashify = require('./inline-prop-to-css');
var arrayConcat = Array.prototype.concat;

module.exports = processObj;

function processObj(name, obj, query) {
  var result = partitionProps(obj);
  var nested = result.nested;
  var classes = Object.keys(result.props).length ?
    [stringify(name, result.props, query)] : [];
  return arrayConcat.apply(classes, processNested(name, nested, query));
}

function processNested(name, nested, query) {
  return Object.keys(nested).map(function(key) {
    var val = nested[key];
    return isMediaQuery(key) ?
      processObj(name, val, key) : processObj({
        selector: name.selector + key,
        prefix: name.prefix
      }, val, query);
  });
}

function partitionProps(propsObj) {
  return Object.keys(propsObj).reduce(function(acc, key) {
    var val = propsObj[key];
    var dest = {
      number: 'props',
      string: 'props',
      object: 'nested'
    }[typeof val];
    if (dest) {
      acc[dest][key] = val;
    }
    return acc;
  }, {props: {}, nested: {}});
}

function isMediaQuery(key) {
  return key.substring(0, 6) === '@media';
}

/**
 * Stringification helpers
 */

function stringify(name, props, query) {
  return query ? makeMediaQuery(name, props, query) : makeClass(name, props);
}

function makeClass(name, props) {
  return name.prefix + '.' + name.selector + ' {\n'
    + inlineStyle(props) + '\n}';
}

function makeMediaQuery(name, props, query) {
  return query + ' {\n' + makeClass(name, props) + '\n}';
}

function inlineStyle(obj) {
  return '  ' + Object.keys(obj).map(function(prop) {
    return dashify(prop).concat(': ').concat(obj[prop])
  }).join(';\n  ');
}
