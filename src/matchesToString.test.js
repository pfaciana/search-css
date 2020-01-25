const matchesToString = require('./matchesToString');
const {buildSelector, buildAtRules, mergeAtRules, orderAtRules, groupAtRules, orderProperties, outputAtRules} = matchesToString;

const matches = [{
	atrules: [],
	selectors: ['.font-semibold'],
	declarations: {'font-weight': '600'}
}, {
	atrules: [],
	selectors: ['.bg-red'],
	declarations: {'color': 'white', 'background-color': 'red'}
}, {
	atrules: ["@media (min-width: 50em)", "@supports (flex-wrap: wrap)"],
	selectors: [".a.b .c .d", ".e"],
	declarations: {"margin": "0px !important", "border": "1px solid red", "padding": "10rem", "color": "gray"}
}, {
	atrules: [],
	selectors: [":root"],
	declarations: {"--blue": "#0074D9"}
}, {
	atrules: ['@media print'],
	selectors: ['.print:font-semibold'],
	declarations: {'font-weight': '600'}
}, {
	atrules: ['@media min-width:641px'],
	selectors: ['.print:font-semibold'],
	declarations: {'font-weight': '500'}
}, {
	atrules: [],
	selectors: ['.font-extrabold'],
	declarations: {'font-weight': '800'}
}, {
	atrules: ['@media print'],
	selectors: ['.print:font-extrabold'],
	declarations: {'font-weight': '800'}
}, {
	atrules: [],
	selectors: [":root"],
	declarations: {"--blue": "#0074D9"}
}, {
	atrules: ["@keyframes pulse", "@media (min-width: 50em)", "@supports (flex-wrap: wrap)"],
	selectors: ["0%", "25%"],
	declarations: {"background-color": "#001F3F"}
}, {
	atrules: ["@keyframes pulse", "@media (min-width: 50em)", "@supports (flex-wrap: wrap)"],
	selectors: ["end"],
	declarations: {"background-color": "#FF4136"}
}];

describe('buildSelector', () => {
	const table = [
		[matches[0], {'.font-semibold': {'font-weight': '600'}}],
		[matches[1], {'.bg-red': {'color': 'white', 'background-color': 'red'}}],
		[matches[2], {'.a.b .c .d, .e': {"margin": "0px !important", "border": "1px solid red", "padding": "10rem", "color": "gray"}}],
		[`bad input`, {}],
	];

	test.each(table)('%p', (match, output) => {
		expect(buildSelector(match)).toStrictEqual(output);
	});
});

describe('orderProperties', () => {
	const table = [
		[
			{float: 0, flex: 1, clear: 2, opacity: 3, 'missing-prop-b': 4, position: 5, 'missing-prop-a': 6},
			['missing-prop-a', 'missing-prop-b', 'position', 'opacity', 'flex', 'float', 'clear'],
		],
		[{'missing-prop-a': 6}, ['missing-prop-a'],],
		[undefined, [],],
	];

	test.each(table)('%p', (input, output) => {
		expect(Object.keys(orderProperties(input))).toStrictEqual(output);
	});
});

describe('buildAtRules', () => {
	const table = [
		[matches.slice(0, 3), [{
			'@root': {'.font-semibold': {'font-weight': '600',}}
		}, {
			'@root': {'.bg-red': {'background-color': 'red', 'color': 'white',}}
		}, {
			'@media (min-width: 50em), @supports (flex-wrap: wrap)': {'.a.b .c .d, .e': {"margin": "0px !important", "border": "1px solid red", "padding": "10rem", "color": "gray"}}
		}]],
		[null, []],
	];

	test.each(table)('%p', (matches, output) => {
		expect(buildAtRules(matches)).toStrictEqual(output);
	});
});

describe('groupAtRules', () => {
	const table = [

		[[{
			'@root': {'.font-semibold': {'font-weight': '600',}}
		}, {
			'@root': {'.bg-red': {'background-color': 'red', 'color': 'white',}}
		}, {
			'@media (min-width: 50em), @supports (flex-wrap: wrap)': {'.a.b .c .d, .e': {"margin": "0px !important", "border": "1px solid red", "padding": "10rem", "color": "gray"}}
		}], [{
			'@root': {
				'.font-semibold': {'font-weight': '600',},
				'.bg-red': {'background-color': 'red', 'color': 'white',},
			},
		}, {
			'@media (min-width: 50em), @supports (flex-wrap: wrap)': {'.a.b .c .d, .e': {"margin": "0px !important", "border": "1px solid red", "padding": "10rem", "color": "gray"}}
		}]],

		[[{
			'@root': {'.font-semibold': {'font-weight': '600', 'font-style': 'italic',}}
		}, {
			'@root': {'.font-semibold': {'font-weight': '700',}}
		}], [{
			'@root': {
				'.font-semibold': {'font-weight': '700', 'font-style': 'italic',},
			},
		}]],

		[[{
			'@root': {'.font-semibold': {'font-weight': '600',}}
		}, {
			'@media print': {'.font-semibold': {'font-weight': '400',}}
		}, {
			'@root': {'.font-semibold': {'font-weight': '700',}}
		}]], // no change
		[null, []],
	];

	test.each(table)('%p', (matches, output = matches) => {
		expect(groupAtRules(matches)).toStrictEqual(output);
	});
});

describe('orderAtRules', () => {
	const table = [

		[[{
			'@root': {'.font-semibold': {'font-weight': '600',}}
		}, {
			'@root': {'.bg-red': {'background-color': 'red', 'color': 'white',}}
		}, {
			'@root': {'.font-semibold': {'font-weight': '700',}}
		}, {
			'@media (min-width: 50em), @supports (flex-wrap: wrap)': {'.a.b .c .d, .e': {"margin": "0px !important", "border": "1px solid red", "padding": "10rem", "color": "gray"}}
		}], [{
			'@root': {
				'.font-semibold': {'font-weight': '700',},
				'.bg-red': {'background-color': 'red', 'color': 'white',},
			},
		}, {
			'@media (min-width: 50em), @supports (flex-wrap: wrap)': {'.a.b .c .d, .e': {"margin": "0px !important", "border": "1px solid red", "padding": "10rem", "color": "gray"}}
		}]],

		[[{
			'@root': {'.font-semibold': {'font-weight': '600', 'font-style': 'italic',}}
		}, {
			'@root': {'.font-semibold': {'font-weight': '700',}}
		}], [{
			'@root': {
				'.font-semibold': {'font-weight': '700', 'font-style': 'italic',},
			},
		}]],

		[[{
			'@root': {'.font-semibold': {'font-weight': '700',}}
		}, {
			'@media print': {'.font-semibold': {'font-weight': '400',}}
		}, {
			'@root': {'.font-semibold': {'font-weight': '600',}}
		}], [{
			'@root': {'.font-semibold': {'font-weight': '600',}}
		}, {
			'@media print': {'.font-semibold': {'font-weight': '400',}}
		}]],
		[null, []]
	];

	test.each(table)('%p', (matches, output = matches) => {
		expect(orderAtRules(matches)).toStrictEqual(output);
	});
});

describe('outputAtRules', () => {
	const table = [
		['simple', [{
			'@root': {
				'.font-semibold': {'font-weight': '700',},
				'.bg-red': {'background-color': 'red', 'color': 'white',},
			},
		}, {
			'@media (min-width: 50em), @supports (flex-wrap: wrap)': {'.a.b .c .d, .e': {"color": "gray", "margin": "0px !important", "border": "1px solid red", "padding": "10rem"}}
		}, {
			'@media print': {'.font-semibold': {'font-weight': '400',}}
		}]],
	];

	test.each(table)('%p', (name, atRules) => {
		expect(outputAtRules({orderProperties: 1, nestAtRules: 1, nestSelectorRules: 1}, atRules)).toMatchSnapshot();

		expect(outputAtRules({orderProperties: 0, nestAtRules: 1, nestSelectorRules: 1}, atRules)).toMatchSnapshot();
		expect(outputAtRules({orderProperties: 0, nestAtRules: 0, nestSelectorRules: 1}, atRules)).toMatchSnapshot();

		expect(outputAtRules({orderProperties: 0, nestAtRules: 1, nestSelectorRules: 0}, atRules)).toMatchSnapshot();
		expect(outputAtRules({orderProperties: 0, nestAtRules: 0, nestSelectorRules: 0}, atRules)).toMatchSnapshot();
		expect(outputAtRules({}, null)).toStrictEqual('');
	});
});

describe('matchesToString', () => {
	const table = [
		['single @root', [{
			atrules: [],
			selectors: ['.bg-red'],
			declarations: {'color': 'white', 'background-color': 'red'}
		},]],
		['single @media', [{
			atrules: ['@media (max-width: 479px)'],
			selectors: ['.pv:bg-red'],
			declarations: {'background-color': 'red'}
		}]],
		['multiple @media', [{
			atrules: ['@media (max-width: 479px)'],
			selectors: ['.pv:bg-red'],
			declarations: {'background-color': 'red'}
		}, {
			atrules: ['@media print'],
			selectors: ['.print:bg-red'],
			declarations: {'background-color': 'red'}
		}]],
		['multiple @media and selectors', [{
			atrules: [],
			selectors: ['.font-semibold'],
			declarations: {'font-weight': '600'}
		}, {
			atrules: ['@media print'],
			selectors: ['.print:font-semibold'],
			declarations: {'font-weight': '600'}
		}, {
			atrules: [],
			selectors: ['.font-extrabold'],
			declarations: {'font-weight': '800'}
		}, {
			atrules: [],
			selectors: ['.font-semibold'],
			declarations: {'font-weight': '500'}
		}, {
			atrules: ['@media print'],
			selectors: ['.print:font-extrabold'],
			declarations: {'font-weight': '800'}
		}]],
		['large', matches],
	];

	test.each(table)('%p', (name, matches) => {
		expect(matchesToString({orderAtRules: 0, orderProperties: 0, nestAtRules: 1, nestSelectorRules: 1}, matches)).toMatchSnapshot();
		expect(matchesToString({orderAtRules: 1, orderProperties: 1, nestAtRules: 1, nestSelectorRules: 1}, matches)).toMatchSnapshot();

		expect(matchesToString({orderAtRules: 1, orderProperties: 0, nestAtRules: 1, nestSelectorRules: 1}, matches)).toMatchSnapshot();
		expect(matchesToString({orderAtRules: 1, orderProperties: 0, nestAtRules: 0, nestSelectorRules: 1}, matches)).toMatchSnapshot();

		expect(matchesToString({orderAtRules: 1, orderProperties: 0, nestAtRules: 1, nestSelectorRules: 0}, matches)).toMatchSnapshot();
		expect(matchesToString({orderAtRules: 1, orderProperties: 0, nestAtRules: 0, nestSelectorRules: 0}, matches)).toMatchSnapshot();

		expect(matchesToString({}, [])).toStrictEqual('');
	});
});