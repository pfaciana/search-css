const parseCss = require('./parseCSS');
const matchesToString = require('./matchesToString');

const declarationTypes = ['@page', '@font-face', 'keyframe', 'rule'];
const inlineSelectorTypes = ['@page', '@font-face'];
const valuelessTypes = ['@host'];
const queryKeys = ['atrules', 'selector', 'property', 'value'];

// IE Polyfills
!String.prototype.startsWith && (String.prototype.startsWith = function (search, rawPos = 0) {
	var pos = rawPos > 0 ? rawPos | 0 : 0;
	return this.substring(pos, pos + search.length) === search;
});

!String.prototype.endsWith & (String.prototype.endsWith = function (search, this_len) {
	if (this_len === undefined || this_len > this.length) {
		this_len = this.length;
	}
	return this.substring(this_len - search.length, this_len) === search;
});

!String.prototype.includes && (String.prototype.includes = function (search, start = 0) {
	if (search instanceof RegExp) {
		throw TypeError('first argument must not be a RegExp');
	}
	return this.indexOf(search, start) !== -1;
});

const normalizeCondition = (value, specialChar = '|') => {
	if (Array.isArray(value)) {
		return {type: 'in', value};
	}

	if (value instanceof RegExp) {
		return {type: 'regex', value};
	}

	if (value.startsWith('/')) {
		const pattern = value.match(/^ *\/(.*)\/(.*) *$/);
		if (pattern) {
			return {type: 'regex', value: new RegExp(pattern[1], (pattern.length > 1 ? pattern[2] : ''))};
		}
	}

	if (value.startsWith(specialChar) && value.endsWith(specialChar)) {
		return {type: 'has', value: value.slice(specialChar.length, -specialChar.length)};
	}

	if (value.startsWith(specialChar)) {
		return {type: 'ends', value: value.slice(specialChar.length)};
	}

	if (value.endsWith(specialChar)) {
		return {type: 'starts', value: value.slice(0, -specialChar.length)};
	}

	if (value.includes(specialChar)) {
		return {type: 'in', value: value.split(specialChar)};
	}

	return {type: 'exact', value};
};

const isValidCondition = ({type, value: pattern}, subject) => {
	if (type === 'regex') {
		return pattern.test(subject)
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
const searchCSS = (ast, query = {}, options = {}) => {
	options = Object.assign({}, {declarationMax: false, specialChar: '|'}, options);
	options.declarationMax = ~~options.declarationMax; // convert to integer

	let matches = [];
	matches.toString = matchesToString;
	matches.error = null;

	if (!Object.keys(query = normalizeQuery(query, options.specialChar)).length) {
		matches.error = 'Valid keys are missing';
		return matches;
	}

	if (typeof ast === 'string') {
		ast = parseCSS(ast, {columns: true});
	}

	(function searchRules(rules, atRules = []) {
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

			if (options.declarationMax && options.declarationMax > 0 && properties.length > options.declarationMax) {
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
				if (!(properties.some(property => {
					const value = rule.declarations[property], declaration = {property, value};
					return ['property', 'value'].every(key => query[key] ? isValidCondition(query[key], declaration[key]) : true);
				}))) { /* Condition for Full Declarations Format: !rule.declarations.some(declaration => ['property', 'value'].every(key => query[key] ? isValidCondition(query[key], declaration[key]) : true)) */
					return;
				}
			}

			matches.push({
				'atrules': currentAtRules || [],
				'selectors': rule.selectors || [],
				'declarations': rule.declarations,
			});
		});
	})(ast);

	return matches;
};

module.exports = searchCSS;

module.exports.normalizeCondition = normalizeCondition;

module.exports.isValidCondition = isValidCondition;

module.exports.normalizeQuery = normalizeQuery;

module.exports.declarationTypes = [...declarationTypes];

module.exports.inlineSelectorTypes = [...inlineSelectorTypes];

module.exports.valuelessTypes = [...valuelessTypes];

module.exports.queryKeys = [...queryKeys];