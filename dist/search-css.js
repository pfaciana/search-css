(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

module.exports.parseCSS = require('./src/parseCSS');
module.exports.searchCSS = require('./src/searchCSS');

if (typeof window === 'object') {
  window.parseCSS = module.exports.parseCSS;
  window.searchCSS = module.exports.searchCSS;
}

},{"./src/parseCSS":2,"./src/searchCSS":3}],2:[function(require,module,exports){
"use strict";

// http://www.w3.org/TR/CSS21/grammar.html
// https://github.com/visionmedia/css-parse/pull/49#issuecomment-30088027
var commentre = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g;

module.exports = function (css, options) {
  options = options || {};
  /**
   * Positional.
   */

  var lineno = 1;
  var column = 1;
  /**
   * Update lineno and column based on `str`.
   */

  function updatePosition(str) {
    var lines = str.match(/\n/g);
    if (lines) lineno += lines.length;
    var i = str.lastIndexOf('\n');
    column = ~i ? str.length - i : column + str.length;
  }
  /**
   * Mark position and patch `node.position`.
   */


  function position() {
    var start = {
      line: lineno,
      column: column
    };
    return function (node) {
      options.position && (node.position = new Position(start));
      whitespace();
      return node;
    };
  }
  /**
   * Store position information for a node
   */


  function Position(start) {
    this.start = start;
    this.end = {
      line: lineno,
      column: column
    };
    this.source = options.source;
  }
  /**
   * Non-enumerable source string
   */


  Position.prototype.content = css;
  /**
   * Combine declarations into a single object
   */

  function declarationColumns() {
    let declarations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    if (!declarations.length) {
      return declarations;
    }

    let declObj = {};
    declarations.forEach(declaration => {
      declObj[declaration.property] = declaration.value;
    });
    return declObj;
  }
  /**
   * Error `msg`.
   */


  var errorsList = [];

  function error(msg) {
    var err = new Error(options.source + ':' + lineno + ':' + column + ': ' + msg);
    err.reason = msg;
    err.filename = options.source;
    err.line = lineno;
    err.column = column;
    err.source = css;

    if (options.silent) {
      errorsList.push(err);
    } else {
      throw err;
    }
  }
  /**
   * Parse stylesheet.
   */


  function stylesheet() {
    var rulesList = rules();
    return {
      type: 'root',
      source: options.source,
      rules: rulesList,
      parsingErrors: errorsList
    };
  }
  /**
   * Opening brace.
   */


  function open() {
    return match(/^{\s*/);
  }
  /**
   * Closing brace.
   */


  function close() {
    return match(/^}/);
  }
  /**
   * Parse ruleset.
   */


  function rules() {
    var node;
    var rules = [];
    whitespace();
    comments(rules);

    while (css.length && css.charAt(0) != '}' && (node = atrule() || rule())) {
      if (node !== false) {
        rules.push(node);
        comments(rules);
      }
    }

    return rules;
  }
  /**
   * Match `re` and return captures.
   */


  function match(re) {
    var m = re.exec(css);
    if (!m) return;
    var str = m[0];
    updatePosition(str);
    css = css.slice(str.length);
    return m;
  }
  /**
   * Parse whitespace.
   */


  function whitespace() {
    match(/^\s*/);
  }
  /**
   * Parse comments;
   */


  function comments(rules) {
    var c;
    rules = rules || [];

    while (c = comment()) {
      if (c !== false) {
        rules.push(c);
      }
    }

    return rules;
  }
  /**
   * Parse comment.
   */


  function comment() {
    var pos = position();
    if ('/' != css.charAt(0) || '*' != css.charAt(1)) return;
    var i = 2;

    while ("" != css.charAt(i) && ('*' != css.charAt(i) || '/' != css.charAt(i + 1))) ++i;

    i += 2;

    if ("" === css.charAt(i - 1)) {
      return error('End of comment missing');
    }

    var str = css.slice(2, i - 2);
    column += 2;
    updatePosition(str);
    css = css.slice(i);
    column += 2;
    return pos({
      type: '@comment',
      value: str
    });
  }
  /**
   * Parse selector.
   */


  function selector() {
    var m = match(/^([^{]+)/);
    if (!m) return;
    /* @fix Remove all comments from selectors
     * http://ostermiller.org/findcomment.html */

    return trim(m[0]).replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*\/+/g, '').replace(/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'/g, function (m) {
      return m.replace(/,/g, '\u200C');
    }).split(/\s*(?![^(]*\)),\s*/).map(function (s) {
      return s.replace(/\u200C/g, ',');
    });
  }
  /**
   * Parse declaration.
   */


  function declaration() {
    var pos = position(); // prop

    var prop = match(/^(\*?[-#\/\*\\\w]+(\[[0-9a-z_-]+\])?)\s*/);
    if (!prop) return;
    prop = trim(prop[0]); // :

    if (!match(/^:\s*/)) return error("property missing ':'"); // val

    var val = match(/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^\)]*?\)|[^};])+)/);
    var ret = pos({
      //type: 'declaration',
      property: prop.replace(commentre, ''),
      value: val ? trim(val[0]).replace(commentre, '') : ''
    }); // ;

    match(/^[;\s]*/);
    return ret;
  }
  /**
   * Parse declarations.
   */


  function declarations() {
    var decls = [];
    if (!open()) return error("missing '{'");
    comments(decls); // declarations

    var decl;

    while (decl = declaration()) {
      if (decl !== false) {
        decls.push(decl);
        comments(decls);
      }
    }

    if (!close()) return error("missing '}'");
    return decls;
  }
  /**
   * Parse keyframe.
   */


  function keyframe() {
    var m;
    var vals = [];
    var pos = position();

    while (m = match(/^((\d+\.\d+|\.\d+|\d+)%?|[a-z]+)\s*/)) {
      vals.push(m[1]);
      match(/^,\s*/);
    }

    if (!vals.length) return;
    var decls = declarations();
    options.columns && (decls = declarationColumns(decls));

    if (options.combine) {
      return pos({
        type: 'keyframe',
        [vals]: decls
      });
    }

    return pos({
      type: 'keyframe',
      selectors: vals,
      declarations: decls
    });
  }
  /**
   * Parse keyframes.
   */


  function atkeyframes() {
    var pos = position();
    var m = match(/^@([-\w]+)?keyframes\s*/);
    if (!m) return;
    var vendor = m[1]; // identifier

    var m = match(/^([-\w]+)\s*/);
    if (!m) return error("@keyframes missing name");
    var name = m[1];
    if (!open()) return error("@keyframes missing '{'");
    var frame;
    var frames = comments();

    while (frame = keyframe()) {
      frames.push(frame);
      frames = frames.concat(comments());
    }

    if (!close()) return error("@keyframes missing '}'");
    return pos({
      type: '@keyframes',
      value: name,
      vendor: vendor,
      rules: frames
    });
  }
  /**
   * Parse supports.
   */


  function atsupports() {
    var pos = position();
    var m = match(/^@supports *([^{]+)/);
    if (!m) return;
    var supports = trim(m[1]);
    if (!open()) return error("@supports missing '{'");
    var style = comments().concat(rules());
    if (!close()) return error("@supports missing '}'");
    return pos({
      type: '@supports',
      value: supports,
      rules: style
    });
  }
  /**
   * Parse host.
   */


  function athost() {
    var pos = position();
    var m = match(/^@host\s*/);
    if (!m) return;
    if (!open()) return error("@host missing '{'");
    var style = comments().concat(rules());
    if (!close()) return error("@host missing '}'");
    return pos({
      type: '@host',
      rules: style
    });
  }
  /**
   * Parse media.
   */


  function atmedia() {
    var pos = position();
    var m = match(/^@media *([^{]+)/);
    if (!m) return;
    var media = trim(m[1]);
    if (!open()) return error("@media missing '{'");
    var style = comments().concat(rules());
    if (!close()) return error("@media missing '}'");
    return pos({
      type: '@media',
      value: media,
      rules: style
    });
  }
  /**
   * Parse custom-media.
   */


  function atcustommedia() {
    var pos = position();
    var m = match(/^@custom-media\s+(--[^\s]+)\s*([^{;]+);/);
    if (!m) return;
    return pos({
      type: '@custom-media',
      name: trim(m[1]),
      value: trim(m[2])
    });
  }
  /**
   * Parse paged media.
   */


  function atpage() {
    var pos = position();
    var m = match(/^@page */);
    if (!m) return;
    var sel = selector() || [];
    if (!open()) return error("@page missing '{'");
    var decls = comments(); // declarations

    var decl;

    while (decl = declaration()) {
      decls.push(decl);
      decls = decls.concat(comments());
    }

    if (!close()) return error("@page missing '}'");
    options.columns && (decls = declarationColumns(decls));

    if (options.combine) {
      return pos({
        type: '@page',
        [sel]: decls
      });
    }

    return pos({
      type: '@page',
      selectors: sel,
      declarations: decls
    });
  }
  /**
   * Parse document.
   */


  function atdocument() {
    var pos = position();
    var m = match(/^@([-\w]+)?document *([^{]+)/);
    if (!m) return;
    var vendor = trim(m[1]);
    var doc = trim(m[2]);
    if (!open()) return error("@document missing '{'");
    var style = comments().concat(rules());
    if (!close()) return error("@document missing '}'");
    return pos({
      type: '@document',
      value: doc,
      vendor: vendor,
      rules: style
    });
  }
  /**
   * Parse font-face.
   */


  function atfontface() {
    var pos = position();
    var m = match(/^@font-face\s*/);
    if (!m) return;
    if (!open()) return error("@font-face missing '{'");
    var decls = comments(); // declarations

    var decl;

    while (decl = declaration()) {
      decls.push(decl);
      decls = decls.concat(comments());
    }

    if (!close()) return error("@font-face missing '}'");
    options.columns && (decls = declarationColumns(decls));

    if (options.combine) {
      return pos({
        type: '@font-face',
        [[]]: decls
      });
    }

    return pos({
      type: '@font-face',
      declarations: decls
    });
  }
  /**
   * Parse import
   */


  var atimport = _compileAtrule('import');
  /**
   * Parse charset
   */


  var atcharset = _compileAtrule('charset');
  /**
   * Parse namespace
   */


  var atnamespace = _compileAtrule('namespace');
  /**
   * Parse non-block at-rules
   */


  function _compileAtrule(name) {
    var re = new RegExp('^@' + name + '\\s*([^;]+);');
    return function () {
      var pos = position();
      var m = match(re);
      if (!m) return;
      var ret = {
        type: '@' + name,
        value: m[1].trim()
      };
      return pos(ret);
    };
  }
  /**
   * Parse at rule.
   */


  function atrule() {
    if (css[0] != '@') return;
    return atkeyframes() || atmedia() || atcustommedia() || atsupports() || atimport() || atcharset() || atnamespace() || atdocument() || atpage() || athost() || atfontface();
  }
  /**
   * Parse rule.
   */


  function rule() {
    var pos = position();
    var sel = selector();
    if (!sel) return error('selector missing');
    comments();
    var decls = declarations();
    options.columns && (decls = declarationColumns(decls));

    if (options.combine) {
      return pos({
        type: 'rule',
        [sel]: decls
      });
    }

    return pos({
      type: 'rule',
      selectors: sel,
      declarations: decls
    });
  }

  return addParent(stylesheet());
};
/**
 * Trim `str`.
 */


function trim(str) {
  return str ? str.replace(/^\s+|\s+$/g, '') : '';
}
/**
 * Adds non-enumerable parent node reference to each node.
 */


function addParent(obj, parent) {
  var isNode = obj && typeof obj.type === 'string';
  var childParent = isNode ? obj : parent;

  for (var k in obj) {
    var value = obj[k];

    if (Array.isArray(value)) {
      value.forEach(function (v) {
        addParent(v, childParent);
      });
    } else if (value && typeof value === 'object') {
      addParent(value, childParent);
    }
  }

  if (isNode) {
    Object.defineProperty(obj, 'parent', {
      configurable: true,
      writable: true,
      enumerable: false,
      value: parent || null
    });
  }

  return obj;
}

},{}],3:[function(require,module,exports){
"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const parseCss = require('./parseCSS');

const declarationTypes = ['@page', '@font-face', 'keyframe', 'rule'];
const inlineSelectorTypes = ['@page', '@font-face'];
const valuelessTypes = ['@host'];
const queryKeys = ['atrules', 'selector', 'property', 'value'];

const normalizeCondition = function normalizeCondition(value) {
  let specialChar = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '|';

  if (Array.isArray(value)) {
    return {
      type: 'in',
      value
    };
  }

  if (value instanceof RegExp) {
    return {
      type: 'regex',
      value
    };
  }

  if (value.startsWith('/')) {
    const pattern = value.match(/^ *\/(.*)\/(.*) *$/);

    if (pattern) {
      return {
        type: 'regex',
        value: new RegExp(pattern[1], pattern.length > 1 ? pattern[2] : '')
      };
    }
  }

  if (value.startsWith(specialChar) && value.endsWith(specialChar)) {
    return {
      type: 'has',
      value: value.slice(specialChar.length, -specialChar.length)
    };
  }

  if (value.startsWith(specialChar)) {
    return {
      type: 'ends',
      value: value.slice(specialChar.length)
    };
  }

  if (value.endsWith(specialChar)) {
    return {
      type: 'starts',
      value: value.slice(0, -specialChar.length)
    };
  }

  if (value.includes(specialChar)) {
    return {
      type: 'in',
      value: value.split(specialChar)
    };
  }

  return {
    type: 'exact',
    value
  };
};

const isValidCondition = (_ref, subject) => {
  let {
    type,
    value: pattern
  } = _ref;

  if (type === 'regex') {
    return pattern.test(subject);
  }

  if (type === 'has') {
    return subject.includes(pattern);
  }

  if (type === 'starts') {
    return subject.startsWith(pattern);
  }

  if (type === 'ends') {
    return subject.endsWith(pattern);
  }

  if (type === 'in') {
    return pattern.includes(subject);
  }

  return pattern === subject;
};

const matchesToString = function matchesToString() {
  let matches = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  options = _objectSpread({}, {
    groupAtRules: false,
    indent: 4,
    lineDelimiter: "\n",
    selectorDelimiter: ', '
  }, {}, options);
  const indent = ' '.repeat(options.indent);
  let outputs = [];

  if (options.groupAtRules) {
    matches.sort((a, b) => {
      const rulesA = a.atrules ? a.atrules.join().toLowerCase() : '';
      const rulesB = b.atrules ? b.atrules.join().toLowerCase() : '';
      return rulesA.localeCompare(rulesB);
    });
  }

  let previousAtRuleString = null;
  matches.forEach((match, index) => {
    let lines = [];
    const atRuleString = match.atrules && match.atrules.length > 0 ? match.atrules.join(options.selectorDelimiter) : '@root';

    if (!options.groupAtRules || previousAtRuleString !== atRuleString) {
      index && lines.push("}".concat(options.lineDelimiter));
      lines.push("".concat(atRuleString, " {").concat(options.lineDelimiter));
    }

    lines.push("".concat(indent).concat(match.selectors.join(options.selectorDelimiter).replace('\\:', ':'), " {"));
    Object.entries(match.declarations).forEach((_ref2) => {
      let [key, value] = _ref2;
      return lines.push("".concat(indent).concat(indent).concat(key, ": ").concat(value, ";"));
    });
    lines.push("".concat(indent, "}"));
    outputs.push(lines.join(options.lineDelimiter));
    previousAtRuleString = atRuleString;
  });
  return outputs.join("".concat(options.lineDelimiter).concat(options.lineDelimiter)) + "".concat(options.lineDelimiter).concat(options.lineDelimiter, "}");
};

const normalizeQuery = (query, specialChar) => {
  let fullQuery = {};
  queryKeys.forEach(key => {
    const value = query[key];

    if (value) {
      if (typeof value === 'string') {
        value.length && (fullQuery[key] = normalizeCondition(value, specialChar));
      } else if (['type', 'value'].filter(x => Object.keys(value).includes(x)).length === 2) {
        fullQuery[key] = value;
      }
    }
  });
  return fullQuery;
};
/* ast must be in {columns: true} format */


const searchCSS = function searchCSS(ast) {
  let query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  let matches = [];
  options = _objectSpread({}, {
    singleDeclaration: false,
    specialChar: '|'
  }, {}, options);

  if (!Object.keys(query = normalizeQuery(query, options.specialChar)).length) {
    return {
      getMatches: () => [],
      toString: () => '',
      error: 'Valid keys are missing'
    };
  }

  if (typeof ast === 'string') {
    ast = parseCSS(ast, {
      columns: true
    });
  }

  (function searchRules(rules) {
    let atRules = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    rules.forEach(rule => {
      let currentAtRules = [...atRules];

      if (rule.type.charAt(0) === '@' && !inlineSelectorTypes.includes(rule.type)) {
        const atRuleName = rule.type;
        const atRuleDesc = rule.value;
        currentAtRules.push(atRuleDesc && atRuleDesc.length > 0 ? atRuleName + ' ' + atRuleDesc : atRuleName);
      }

      if (rule.rules && rule.rules.length > 0) {
        searchRules(rule.rules, currentAtRules);
        return;
      }

      const properties = rule.declarations ? Object.keys(rule.declarations) : [];

      if (!rule.declarations || !properties.length) {
        return;
      }

      if (options.singleDeclaration && properties.length !== 1) {
        return;
      }

      currentAtRules.sort();

      if (query.atrules) {
        typeof query.atrules.value === 'string' && (query.atrules.value = [query.atrules.value]);
        const currentAtRuleString = currentAtRules && currentAtRules.length > 0 ? currentAtRules.join(', ') : '@root';

        if (!query.atrules.value.some(value => value === currentAtRuleString)) {
          return;
        }
      }

      if (inlineSelectorTypes.includes(rule.type)) {
        rule.selectors = rule.selectors && rule.selectors.length > 0 ? rule.selectors : [null];

        for (let index in rule.selectors) {
          if (rule.selectors.hasOwnProperty(index)) {
            rule.selectors[index] = rule.type + (rule.selectors[index] ? ' ' + rule.selectors[index] : '');
          }
        }
      }

      if (query.selector && rule.selectors) {
        if (!rule.selectors.some(selector => isValidCondition(query.selector, selector))) {
          return;
        }
      }

      if (query.property || query.value) {
        if (!properties.some(property => {
          const value = rule.declarations[property],
                declaration = {
            property,
            value
          };
          return ['property', 'value'].every(key => query[key] ? isValidCondition(query[key], declaration[key]) : true);
        })) {
          /* Condition for Full Declarations Format: !rule.declarations.some(declaration => ['property', 'value'].every(key => query[key] ? isValidCondition(query[key], declaration[key]) : true)) */
          return;
        }
      }

      matches.push({
        'atrules': currentAtRules || [],
        'selectors': rule.selectors || [],
        'declarations': rule.declarations
      });
    });
  })(ast);

  return {
    getMatches: () => [...matches],
    toString: options => matchesToString(matches, options),
    error: null
  };
};

module.exports = searchCSS;
module.exports.normalizeCondition = normalizeCondition;
module.exports.isValidCondition = isValidCondition;
module.exports.matchesToString = matchesToString;
module.exports.normalizeQuery = normalizeQuery;
module.exports.declarationTypes = [...declarationTypes];
module.exports.inlineSelectorTypes = [...inlineSelectorTypes];
module.exports.valuelessTypes = [...valuelessTypes];
module.exports.queryKeys = [...queryKeys];

},{"./parseCSS":2}]},{},[1]);
