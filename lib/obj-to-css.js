'use strict';

var dashify = require('./inline-prop-to-css');
var arrayConcat = Array.prototype.concat;

module.exports = processObj;

function processObj(name, obj, query) {
  var result = partitionProps(obj);
  var nested = result.nested;
  var fallbacks = Object.keys(result.fallbacks).reduce(function(acc, prop) {
    var values = result.fallbacks[prop];
    return acc.concat(fallbacksToDeclarationArray(prop, values));
  }, []);
  var decls = propsToDeclarationArray(result.props).concat(fallbacks);
  var classes = decls.length ? [stringify(name, decls, query)] : [];
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
    var valType = typeof val;
    if (valType === 'number' || valType === 'string') {
      acc.props[key] = val;
    } else if (valType === 'object') {
      if (Array.isArray(val)) {
        acc.fallbacks[key] = val;
      } else {
        acc.nested[key] = val;
      }
    }
    return acc;
  }, {props: {}, nested: {}, fallbacks: {}});
}

function propsToDeclarationArray(props) {
  return Object.keys(props).map(function(key) {
    return {
      prop: key,
      value: props[key]
    };
  });
}

/**
 * Returns declarations in reverse order
 * @param  {string} prop  - delecration prop name
 * @param  {array} values - array of values
 * @return {array}        - array of declarations
 */
function fallbacksToDeclarationArray(prop, values) {
  var declarations = [];
  for (var i = values.length - 1; i >= 0; i--) {
    declarations.push({
      prop: prop,
      value: values[i]
    });
  }
  return declarations;
}

function isMediaQuery(key) {
  return key.substring(0, 6) === '@media';
}

/**
 * Stringification helpers
 */

function stringify(name, decls, query) {
  return query ? makeMediaQuery(name, decls, query) : makeClass(name, decls);
}

function makeClass(name, decls) {
  return name.prefix + '.' + name.selector + ' {\n'
    + inlineStyle(decls) + '\n}';
}

function makeMediaQuery(name, decls, query) {
  return query + ' {\n' + makeClass(name, decls) + '\n}';
}

function inlineStyle(decls) {
  return '  ' + decls.map(function(decl) {
    return declaration(decl.prop, decl.value);
  }).join(';\n  ');
}

function declaration(property, value) {
  return dashify(property).concat(': ').concat(value).concat(' !important');
}
