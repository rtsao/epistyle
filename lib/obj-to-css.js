'use strict';

var dashify = require('./inline-prop-to-css');
var arrayConcat = Array.prototype.concat;

module.exports = processObj;

function processObj(name, obj, query, important) {
  var result = partitionProps(obj);
  var nested = result.nested;
  var fallbacks = Object.keys(result.fallbacks).reduce(function(acc, prop) {
    var values = result.fallbacks[prop];
    return acc.concat(fallbacksToDeclarationArray(prop, values));
  }, []);
  var decls = propsToDeclarationArray(result.props).concat(fallbacks);
  var classes = decls.length ? [stringify(name, decls, query, important)] : [];
  return arrayConcat.apply(classes, processNested(name, nested, query, important));
}

function processNested(name, nested, query, important) {
  return Object.keys(nested).map(function(key) {
    var val = nested[key];
    return isMediaQuery(key) ?
      processObj(name, val, key, important) : processObj({
        selector: name.selector + key,
        prefix: name.prefix
      }, val, query, important);
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

function stringify(name, decls, query, important) {
  return query ? makeMediaQuery(name, decls, query) : makeClass(name, decls, important);
}

function makeClass(name, decls, important) {
  return name.prefix + '.' + name.selector + ' {\n'
    + inlineStyle(decls, important) + '\n}';
}

function makeMediaQuery(name, decls, query, important) {
  return query + ' {\n' + makeClass(name, decls, important) + '\n}';
}

function inlineStyle(decls, important) {
  return '  ' + decls.map(function(decl) {
    return declaration(decl.prop, decl.value, important);
  }).join(';\n  ');
}

function declaration(property, value, important) {
  const decl = dashify(property).concat(': ').concat(value);
  return important ? decl.concat(' !important') : decl;
}
