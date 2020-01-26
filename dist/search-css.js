(function () {
	function r(e, n, t) {
		function o(i, f) {
			if (!n[i]) {
				if (!e[i]) {
					var c = "function" == typeof require && require;
					if (!f && c) return c(i, !0);
					if (u) return u(i, !0);
					var a = new Error("Cannot find module '" + i + "'");
					throw a.code = "MODULE_NOT_FOUND", a
				}
				var p = n[i] = {exports: {}};
				e[i][0].call(p.exports, function (r) {
					var n = e[i][1][r];
					return o(n || r)
				}, p, p.exports, r, e, n, t)
			}
			return n[i].exports
		}

		for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
		return o
	}

	return r
})()({
	1: [function (require, module, exports) {
		"use strict";

		function _typeof(obj) {
			if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
				_typeof = function _typeof(obj) {
					return typeof obj;
				};
			} else {
				_typeof = function _typeof(obj) {
					return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
				};
			}
			return _typeof(obj);
		}

		module.exports.parseCSS = require('./src/parseCSS');
		module.exports.searchCSS = require('./src/searchCSS');

		if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object') {
			window.parseCSS = module.exports.parseCSS;
			window.searchCSS = module.exports.searchCSS;
		}

	}, {"./src/parseCSS": 4, "./src/searchCSS": 5}], 2: [function (require, module, exports) {
		"use strict";

		module.exports = ["all",
			/* Positioning */
			"position", "top", "right", "bottom", "left", "z-index",
			/* Layout */
			"opacity", "visibility", "display", "grid", "grid-template-columns", "grid-template-rows", "grid-template-areas", "grid-template", "grid-column-gap", "grid-row-gap", "grid-gap", "justify-items", "place-items", "place-content", "grid-auto-columns", "grid-auto-rows", "grid-auto-flow", "grid-column-start", "grid-column-end", "grid-row-start", "grid-row-end", "grid-column", "grid-row", "grid-area", "justify-self", "place-self", "flex", "flex-align", "flex-basis", "flex-direction", "flex-wrap", "flex-flow", "flex-shrink", "flex-grow", "flex-order", "flex-pack", "align-content", "align-items", "align-self", "justify-content", "order", "table-layout", "empty-cells", "caption-side", "border-spacing", "border-collapse", "content", "float", "clear", "columns", "column-count", "column-fill", "column-gap", "column-rule", "column-rule-width", "column-rule-style", "column-rule-color", "column-span", "column-width", "orphans", "widows", "break-after", "break-before", "break-inside", "page-break-after", "page-break-before", "page-break-inside", "line-break", "white-space", // normal | pre | nowrap | pre-wrap | pre-line | break-spaces
			"tab-size",
			/* Box-model */
			"box-sizing", "width", "min-width", "max-width", "height", "min-height", "max-height", "overflow", "overflow-x", "overflow-y", "-webkit-overflow-scrolling", "-ms-overflow-x", "-ms-overflow-y", "-ms-overflow-style", "box-decoration-break", "clip", "clip-path", "margin", "margin-top", "margin-right", "margin-bottom", "margin-left", "padding", "padding-top", "padding-right", "padding-bottom", "padding-left", "border", "border-color", "border-style", "border-width", "border-top", "border-top-color", "border-top-style", "border-top-width", "border-right", "border-right-color", "border-right-style", "border-right-width", "border-bottom", "border-bottom-color", "border-bottom-style", "border-bottom-width", "border-left", "border-left-color", "border-left-style", "border-left-width", "border-radius", "border-top-left-radius", "border-top-right-radius", "border-bottom-right-radius", "border-bottom-left-radius", "border-image", "border-image-source", "border-image-slice", "border-image-width", "border-image-outset", "border-image-repeat", "outline", "outline-width", "outline-style", "outline-color", "outline-offset", "stroke", "box-shadow", "list-style", "list-style-position", "list-style-type", "list-style-image", "transform", "transform-origin", "transform-style", "backface-visibility", "perspective", "perspective-origin", "zoom", "filter", "mix-blend-mode", // normal | multiply | screen | overlay | darken | lighten | color-dodge | color-burn | hard-light | soft-light | difference | exclusion | hue | saturation | color | luminosity
			"-ms-interpolation-mode",
			/* Visual */
			"color", "background", "background-color", "background-image", "background-repeat", "background-attachment", "background-position", "background-position-x", "background-position-y", "background-clip", "background-origin", "background-size", "background-blend-mode", // normal | multiply | screen | overlay | darken | lighten | color-dodge | color-burn | hard-light | soft-light | difference | exclusion | hue | saturation | color | luminosity
			"fill",
			/* Typography */
			"font", "font-family", "font-size", // xx-small | x-small | small | medium | large | x-large | xx-large | xxx-large | smaller | larger | <length> | <percentage>
			"font-style", // normal | italic | oblique <angle>{0,2}
			"font-weight", // normal | bold | bolder | lighter | <number>{100,900}
			"font-variant", // normal | none | small-caps
			"font-variant-alternates", "font-variant-caps", "font-variant-east-asian", "font-variant-ligatures", "font-variant-numeric", "font-variant-position", "font-size-adjust", // none | <number>
			"font-stretch", // normal | ultra-condensed | extra-condensed | condensed | semi-condensed | semi-expanded | expanded | extra-expanded | ultra-expanded | <percentage>
			"font-feature-settings", // normal | <string> | <integer> | on | off
			"font-kerning", // auto | normal | none
			"font-effect", "font-emphasize", "font-emphasize-position", "font-emphasize-style", "font-smooth", // auto | never | always | <length>
			"line-height", // normal | <number> | <length> | <percentage>
			"text-align", // start | end | left | right | center | justify | match-parent
			"text-align-last", // auto | start | end | left | right | center | justify
			"text-emphasis", "text-emphasis-color", "text-emphasis-style", // none | filled | open | dot | circle | double-circle | triangle | sesame | <string>
			"text-emphasis-position", // over | under | right | left
			"text-decoration", "text-decoration-color", "text-decoration-line", // none | underline | overline | line-through | blink | spelling-error | grammar-error
			"text-decoration-style", // solid | double | dotted | dashed | wavy
			"text-decoration-thickness", // auto | from-font | <length>
			"text-indent", // <length> | <percentage>
			"text-justify", "text-outline", "-ms-text-overflow", "text-overflow", // clip | ellipsis | <string>
			"text-overflow-ellipsis", "text-overflow-mode", "text-shadow", "text-transform", // none | capitalize | uppercase | lowercase | full-width | full-size-kana
			"text-wrap", // wrap | nowrap | balance | stable | pretty
			"hyphens", "-webkit-text-size-adjust", // none | auto | <percentage>
			"-ms-text-size-adjust", "letter-spacing", "-ms-word-break", "word-break", // normal | break-all | keep-all | break-word
			"word-spacing", // normal | <length> | <percentage>
			"-ms-word-wrap", "word-wrap", // normal | break-word
			"overflow-wrap", // normal | break-word | anywhere
			"vertical-align", // baseline | sub | super | text-top | text-bottom | middle | top | bottom | <percentage> | <length>
			"quotes", "direction", "unicode-bidi",
			/* Interactions/Interfaces */
			"cursor", "pointer-events", "-ms-touch-action", "touch-action", "resize", "user-select", "appearance", "caret-color",
			/* Animations */
			"animation", "animation-name", "animation-duration", "animation-play-state", "animation-timing-function", "animation-delay", "animation-iteration-count", "animation-direction", "animation-fill-mode", "transition", "transition-delay", "transition-timing-function", "transition-duration", "transition-property", "will-change",
			/* Math */
			"counter-increment", "counter-reset"];

	}, {}], 3: [function (require, module, exports) {
		"use strict";

		function _toConsumableArray(arr) {
			return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
		}

		function _nonIterableSpread() {
			throw new TypeError("Invalid attempt to spread non-iterable instance");
		}

		function _iterableToArray(iter) {
			if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
		}

		function _arrayWithoutHoles(arr) {
			if (Array.isArray(arr)) {
				for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
					arr2[i] = arr[i];
				}
				return arr2;
			}
		}

		function _defineProperty(obj, key, value) {
			if (key in obj) {
				Object.defineProperty(obj, key, {value: value, enumerable: true, configurable: true, writable: true});
			} else {
				obj[key] = value;
			}
			return obj;
		}

		var propertiesOrder = require('./cssPropertyOrder');

		var buildSelector = function buildSelector(match) {
			var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			if (!match.selectors || !Array.isArray(match.selectors) || !match.selectors.length) {
				return {};
			}

			options = Object.assign({}, {
				selectorDelimiter: ', '
			}, options);
			return _defineProperty({}, match.selectors.join(options.selectorDelimiter), match.declarations);
		};

		var buildAtRules = function buildAtRules() {
			var matches = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
			var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			if (!matches || !Array.isArray(matches) || !matches.length) {
				return [];
			}

			options = Object.assign({}, {
				selectorDelimiter: ', '
			}, options);
			var atRuleMatches = [];
			matches.forEach(function (match) {
				var atRuleString = match.atrules && match.atrules.length > 0 ? match.atrules.join(options.selectorDelimiter) : '@root';
				atRuleMatches.push(_defineProperty({}, atRuleString, buildSelector(match, options)));
			});
			return atRuleMatches;
		};

		var mergeAtRules = function mergeAtRules(targetRef, source) {
			var atRuleType = Object.keys(source)[0];
			var rule = source[atRuleType];
			var selector = Object.keys(rule)[0];
			var declaration = rule[selector];

			if (!targetRef[atRuleType]) {
				targetRef[atRuleType] = rule;
			} else if (!targetRef[atRuleType][selector]) {
				targetRef[atRuleType][selector] = declaration;
			} else {
				Object.assign(targetRef[atRuleType][selector], declaration);
			} // return nothing, we are updating the reference

		};

		var orderAtRules = function orderAtRules() {
			var atRules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

			if (!atRules || !Array.isArray(atRules) || !atRules.length) {
				return [];
			}

			var atRulesObj = {},
				orderedAtRules = [];
			atRules.forEach(function (atRule) {
				return mergeAtRules(atRulesObj, atRule);
			});
			Object.keys(atRulesObj).forEach(function (newAtRule) {
				return orderedAtRules.push(_defineProperty({}, newAtRule, atRulesObj[newAtRule]));
			});
			return orderedAtRules;
		};

		var groupAtRules = function groupAtRules() {
			var atRules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

			if (!atRules || !Array.isArray(atRules) || !atRules.length) {
				return [];
			}

			var newAtRules = [],
				previousAtRuleType = null;
			atRules.forEach(function (atRule) {
				var atRuleType = Object.keys(atRule)[0];

				if (atRuleType !== previousAtRuleType) {
					newAtRules.push(atRule);
				} else {
					mergeAtRules(newAtRules[newAtRules.length - 1], atRule);
				}

				previousAtRuleType = atRuleType;
			});
			return newAtRules;
		};

		var orderProperties = function orderProperties(declaration) {
			if (!declaration) {
				return {};
			}

			var properties = Object.keys(declaration);

			if (properties.length < 2) {
				return declaration;
			}

			var propsPos = [],
				extraProps = [],
				orderedDeclarations = {};
			properties.forEach(function (property) {
				var pos = propertiesOrder.indexOf(property);
				pos > -1 ? propsPos[pos] = property : extraProps.push(property);
			});
			var orderedProperties = [].concat(_toConsumableArray(extraProps.sort()), _toConsumableArray(propsPos.filter(function (x) {
				return x;
			})));
			orderedProperties.forEach(function (property) {
				return orderedDeclarations[property] = declaration[property];
			});
			return orderedDeclarations;
		};

		var outputAtRules = function outputAtRules() {
			var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
			var atRules = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;

			if (!atRules || !Array.isArray(atRules) || !atRules.length) {
				return '';
			}

			options = Object.assign({}, {
				indent: 4,
				orderProperties: false,
				nestAtRules: true,
				nestSelectorRules: true
			}, options);
			var tab = ' '.repeat(options.indent);
			var selectorStartTab = options.nestAtRules ? tab : '';
			var selectorEndTab = options.nestSelectorRules && options.nestAtRules ? tab : '';
			var selectorEndLine = options.nestSelectorRules ? '\n' : ' ';
			var declarationTab = options.nestSelectorRules ? selectorStartTab + tab : '';
			var output = '';
			atRules.forEach(function (atRule) {
				var atRuleType = Object.keys(atRule)[0];
				var rules = atRule[atRuleType];
				output += options.nestAtRules ? "".concat(atRuleType, " {\n\n") : "// ".concat(atRuleType, " \n\n");
				Object.keys(rules).forEach(function (selector) {
					var declaration = rules[selector];
					output += "".concat(selectorStartTab).concat(selector, " {").concat(selectorEndLine);
					Object.keys(options.orderProperties ? orderProperties(declaration) : declaration).forEach(function (property) {
						output += "".concat(declarationTab).concat(property, ": ").concat(declaration[property], ";").concat(selectorEndLine);
					});
					output += "".concat(selectorEndTab, "}").concat(selectorEndLine, "\n");
				});
				!options.nestSelectorRules && (output += '\n');
				options.nestAtRules && (output += "}\n\n");
			});
			return output.slice(0, -2);
		};

		var matchesToString = function matchesToString() {
			var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
			var matches = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
			options = Object.assign({}, {
				selectorDelimiter: ', ',
				orderAtRules: false,
				indent: 4,
				orderProperties: false,
				nestAtRules: true,
				nestSelectorRules: true
			}, options);

			if (!matches || !Array.isArray(matches) || !matches.length) {
				return '';
			}

			var atRules = buildAtRules(matches, options);
			atRules = options.orderAtRules ? orderAtRules(atRules) : groupAtRules(atRules);
			return outputAtRules(options, atRules);
		};

		module.exports = matchesToString;
		module.exports.buildSelector = buildSelector;
		module.exports.buildAtRules = buildAtRules;
		module.exports.mergeAtRules = mergeAtRules;
		module.exports.orderAtRules = orderAtRules;
		module.exports.groupAtRules = groupAtRules;
		module.exports.orderProperties = orderProperties;
		module.exports.outputAtRules = outputAtRules;

	}, {"./cssPropertyOrder": 2}], 4: [function (require, module, exports) {
		"use strict";

		function _typeof(obj) {
			if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
				_typeof = function _typeof(obj) {
					return typeof obj;
				};
			} else {
				_typeof = function _typeof(obj) {
					return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
				};
			}
			return _typeof(obj);
		}

		function _defineProperty(obj, key, value) {
			if (key in obj) {
				Object.defineProperty(obj, key, {value: value, enumerable: true, configurable: true, writable: true});
			} else {
				obj[key] = value;
			}
			return obj;
		}

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
				var declarations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

				if (!declarations.length) {
					return declarations;
				}

				var declObj = {};
				declarations.forEach(function (declaration) {
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

				while ("" != css.charAt(i) && ('*' != css.charAt(i) || '/' != css.charAt(i + 1))) {
					++i;
				}

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
					return m.replace(/,/g, "\u200C");
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
					return pos(_defineProperty({
						type: 'keyframe'
					}, vals, decls));
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
					return pos(_defineProperty({
						type: '@page'
					}, sel, decls));
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
					return pos(_defineProperty({
						type: '@font-face'
					}, [], decls));
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
					return pos(_defineProperty({
						type: 'rule'
					}, sel, decls));
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
				} else if (value && _typeof(value) === 'object') {
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

	}, {}], 5: [function (require, module, exports) {
		"use strict";

		function _toConsumableArray(arr) {
			return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
		}

		function _nonIterableSpread() {
			throw new TypeError("Invalid attempt to spread non-iterable instance");
		}

		function _iterableToArray(iter) {
			if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
		}

		function _arrayWithoutHoles(arr) {
			if (Array.isArray(arr)) {
				for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
					arr2[i] = arr[i];
				}
				return arr2;
			}
		}

		var parseCss = require('./parseCSS');

		var matchesToString = require('./matchesToString');

		var declarationTypes = ['@page', '@font-face', 'keyframe', 'rule'];
		var inlineSelectorTypes = ['@page', '@font-face'];
		var valuelessTypes = ['@host'];
		var queryKeys = ['atrules', 'selector', 'property', 'value']; // IE Polyfills

		!String.prototype.startsWith && (String.prototype.startsWith = function (search) {
			var rawPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
			var pos = rawPos > 0 ? rawPos | 0 : 0;
			return this.substring(pos, pos + search.length) === search;
		});
		!String.prototype.endsWith & (String.prototype.endsWith = function (search, this_len) {
			if (this_len === undefined || this_len > this.length) {
				this_len = this.length;
			}

			return this.substring(this_len - search.length, this_len) === search;
		});
		!String.prototype.includes && (String.prototype.includes = function (search) {
			var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

			if (search instanceof RegExp) {
				throw TypeError('first argument must not be a RegExp');
			}

			return this.indexOf(search, start) !== -1;
		});

		var normalizeCondition = function normalizeCondition(value) {
			var specialChar = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '|';

			if (Array.isArray(value)) {
				return {
					type: 'in',
					value: value
				};
			}

			if (value instanceof RegExp) {
				return {
					type: 'regex',
					value: value
				};
			}

			if (value.startsWith('/')) {
				var pattern = value.match(/^ *\/(.*)\/(.*) *$/);

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
				value: value
			};
		};

		var isValidCondition = function isValidCondition(_ref, subject) {
			var type = _ref.type,
				pattern = _ref.value;

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

		var normalizeQuery = function normalizeQuery(query, specialChar) {
			var fullQuery = {};
			queryKeys.forEach(function (key) {
				var value = query[key];

				if (value) {
					if (typeof value === 'string') {
						value.length && (fullQuery[key] = normalizeCondition(value, specialChar));
					} else if (['type', 'value'].filter(function (x) {
						return Object.keys(value).includes(x);
					}).length === 2) {
						fullQuery[key] = value;
					}
				}
			});
			return fullQuery;
		};
		/* ast must be in {columns: true} format */


		var searchCSS = function searchCSS(ast) {
			var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
			var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
			options = Object.assign({}, {
				declarationMax: false,
				specialChar: '|'
			}, options);
			options.declarationMax = ~~options.declarationMax; // convert to integer

			var matches = [];
			matches.toString = matchesToString;
			matches.error = null;

			if (!Object.keys(query = normalizeQuery(query, options.specialChar)).length) {
				matches.error = 'Valid keys are missing';
				return matches;
			}

			if (typeof ast === 'string') {
				ast = parseCSS(ast, {
					columns: true
				});
			}

			(function searchRules(rules) {
				var atRules = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
				rules.forEach(function (rule) {
					var currentAtRules = _toConsumableArray(atRules);

					if (rule.type.charAt(0) === '@' && !inlineSelectorTypes.includes(rule.type)) {
						var atRuleName = rule.type;
						var atRuleDesc = rule.value;
						currentAtRules.push(atRuleDesc && atRuleDesc.length > 0 ? atRuleName + ' ' + atRuleDesc : atRuleName);
					}

					if (rule.rules && rule.rules.length > 0) {
						searchRules(rule.rules, currentAtRules);
						return;
					}

					var properties = rule.declarations ? Object.keys(rule.declarations) : [];

					if (!rule.declarations || !properties.length) {
						return;
					}

					if (options.declarationMax && options.declarationMax > 0 && properties.length > options.declarationMax) {
						return;
					}

					currentAtRules.sort();

					if (query.atrules) {
						typeof query.atrules.value === 'string' && (query.atrules.value = [query.atrules.value]);
						var currentAtRuleString = currentAtRules && currentAtRules.length > 0 ? currentAtRules.join(', ') : '@root';

						if (!query.atrules.value.some(function (value) {
							return value === currentAtRuleString;
						})) {
							return;
						}
					}

					if (inlineSelectorTypes.includes(rule.type)) {
						rule.selectors = rule.selectors && rule.selectors.length > 0 ? rule.selectors : [null];

						for (var index in rule.selectors) {
							if (rule.selectors.hasOwnProperty(index)) {
								rule.selectors[index] = rule.type + (rule.selectors[index] ? ' ' + rule.selectors[index] : '');
							}
						}
					}

					if (query.selector && rule.selectors) {
						if (!rule.selectors.some(function (selector) {
							return isValidCondition(query.selector, selector);
						})) {
							return;
						}
					}

					if (query.property || query.value) {
						if (!properties.some(function (property) {
							var value = rule.declarations[property],
								declaration = {
									property: property,
									value: value
								};
							return ['property', 'value'].every(function (key) {
								return query[key] ? isValidCondition(query[key], declaration[key]) : true;
							});
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

			return matches;
		};

		module.exports = searchCSS;
		module.exports.normalizeCondition = normalizeCondition;
		module.exports.isValidCondition = isValidCondition;
		module.exports.normalizeQuery = normalizeQuery;
		module.exports.declarationTypes = [].concat(declarationTypes);
		module.exports.inlineSelectorTypes = [].concat(inlineSelectorTypes);
		module.exports.valuelessTypes = [].concat(valuelessTypes);
		module.exports.queryKeys = [].concat(queryKeys);

	}, {"./matchesToString": 3, "./parseCSS": 4}]
}, {}, [1]);
