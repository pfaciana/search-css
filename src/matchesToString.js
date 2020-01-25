const propertiesOrder = require('./cssPropertyOrder');

const buildSelector = function (match, options = {}) {
	if (!match.selectors || !Array.isArray(match.selectors) || !match.selectors.length) {
		return {};
	}

	options = Object.assign({}, {selectorDelimiter: ', '}, options);

	return {[match.selectors.join(options.selectorDelimiter)]: match.declarations};
};

const buildAtRules = function (matches = [], options = {}) {
	if (!matches || !Array.isArray(matches) || !matches.length) {
		return [];
	}

	options = Object.assign({}, {selectorDelimiter: ', '}, options);

	let atRuleMatches = [];

	matches.forEach(match => {
		const atRuleString = match.atrules && match.atrules.length > 0 ? match.atrules.join(options.selectorDelimiter) : '@root';

		atRuleMatches.push({
			[atRuleString]: buildSelector(match, options)
		});
	});

	return atRuleMatches;
};

const mergeAtRules = function (targetRef, source) {
	const atRuleType = Object.keys(source)[0];
	const rule = source[atRuleType];
	const selector = Object.keys(rule)[0];
	const declaration = rule[selector];

	if (!targetRef[atRuleType]) {
		targetRef[atRuleType] = rule;
	} else if (!targetRef[atRuleType][selector]) {
		targetRef[atRuleType][selector] = declaration;
	} else {
		Object.assign(targetRef[atRuleType][selector], declaration);
	}

	// return nothing, we are updating the reference
};

const orderAtRules = function (atRules = []) {
	if (!atRules || !Array.isArray(atRules) || !atRules.length) {
		return [];
	}

	let atRulesObj = {}, orderedAtRules = [];

	atRules.forEach(atRule => mergeAtRules(atRulesObj, atRule));

	Object.keys(atRulesObj).forEach(newAtRule => orderedAtRules.push({[newAtRule]: atRulesObj[newAtRule]}));

	return orderedAtRules;
};

const groupAtRules = function (atRules = []) {
	if (!atRules || !Array.isArray(atRules) || !atRules.length) {
		return [];
	}

	let newAtRules = [], previousAtRuleType = null;

	atRules.forEach(atRule => {
		const atRuleType = Object.keys(atRule)[0];

		if (atRuleType !== previousAtRuleType) {
			newAtRules.push(atRule);
		} else {
			mergeAtRules(newAtRules[newAtRules.length - 1], atRule);
		}

		previousAtRuleType = atRuleType;
	});

	return newAtRules;
};

const orderProperties = function (declaration) {
	if (!declaration) {
		return {};
	}

	const properties = Object.keys(declaration);

	if (properties.length < 2) {
		return declaration;
	}

	let propsPos = [], extraProps = [], orderedDeclarations = {};

	properties.forEach(property => {
		const pos = propertiesOrder.indexOf(property);
		pos > -1 ? propsPos[pos] = property : extraProps.push(property);
	});

	const orderedProperties = [...extraProps.sort(), ...propsPos.filter(x => x)];

	orderedProperties.forEach(property => orderedDeclarations[property] = declaration[property]);

	return orderedDeclarations;
};

const outputAtRules = function (options = {}, atRules = this) {
	if (!atRules || !Array.isArray(atRules) || !atRules.length) {
		return '';
	}

	options = Object.assign({}, {indent: 4, orderProperties: false, nestAtRules: true, nestSelectorRules: true}, options);

	const tab = ' '.repeat(options.indent);
	const selectorStartTab = options.nestAtRules ? tab : '';
	const selectorEndTab = options.nestSelectorRules && options.nestAtRules ? tab : '';
	const selectorEndLine = options.nestSelectorRules ? '\n' : ' ';
	const declarationTab = options.nestSelectorRules ? selectorStartTab + tab : '';
	let output = '';

	atRules.forEach(atRule => {
		const atRuleType = Object.keys(atRule)[0];
		const rules = atRule[atRuleType];

		output += options.nestAtRules ? `${atRuleType} {\n\n` : `// ${atRuleType} \n\n`;

		Object.keys(rules).forEach(selector => {
			const declaration = rules[selector];

			output += `${selectorStartTab}${selector} {${selectorEndLine}`;

			Object.keys(options.orderProperties ? orderProperties(declaration) : declaration).forEach(property => {
				output += `${declarationTab}${property}: ${declaration[property]};${selectorEndLine}`;
			});

			output += `${selectorEndTab}}${selectorEndLine}\n`;
		});

		!options.nestSelectorRules && (output += '\n');

		options.nestAtRules && (output += `}\n\n`);
	});

	return output.slice(0, -2);
};

const matchesToString = function (options = {}, matches = this) {
	options = Object.assign({}, {
		selectorDelimiter: ', ', orderAtRules: false,
		indent: 4, orderProperties: false, nestAtRules: true, nestSelectorRules: true,
	}, options);

	if (!matches || !Array.isArray(matches) || !matches.length) {
		return '';
	}

	let atRules = buildAtRules(matches, options);

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