const testData = require('./__snapshots__/test-data');
const parseCSS = require('./parseCSS');

describe('parse css', () => {
	let table = [];

	Object.entries(testData).forEach(([name, {css, ast}]) => {
		table.push([name, css, ast]);
	});

	test.each(table)('%p', (name, css, ast) => {
		expect(JSON.parse(JSON.stringify(parseCSS(css)))).toStrictEqual(ast);
	});
});

test('position', () => {
	const css = `foo,\nbar,\nbaz {\n  color: 'green';\n}`;
	const ast = {
		"type": "root",
		"rules": [{
			"declarations": [
				{
					"position": {
						"end": {"column": 17, "line": 4},
						"start": {"column": 3, "line": 4}
					},
					"property": "color",
					"value": "'green'"
				}
			],
			"position": {
				"end": {"column": 2, "line": 5},
				"start": {"column": 1, "line": 1}
			},
			"selectors": ["foo", "bar", "baz"],
			"type": "rule"
		}],
		"parsingErrors": [],
	};

	expect(JSON.parse(JSON.stringify(parseCSS(css, {position: true})))).toStrictEqual(ast);
});

test('combine', () => {
	const css = `foo,\nbar,\nbaz { color: 'red'; background-color: 'green'; }`;
	const ast = {
		"type": "root",
		"rules": [
			{
				"type": "rule",
				"foo,bar,baz": [
					{
						"property": "color",
						"value": "'red'"
					},
					{
						"property": "background-color",
						"value": "'green'"
					},
				],
			},
		],
		"parsingErrors": [],
	};

	expect(JSON.parse(JSON.stringify(parseCSS(css, {combine: true})))).toStrictEqual(ast);
});

test('columns', () => {
	const css = `foo,\nbar,\nbaz { color: 'red'; background-color: 'green'; }`;
	const ast = {
		"type": "root",
		"rules": [
			{
				"type": "rule",
				"selectors": [
					"foo", "bar", "baz"
				],
				"declarations": {
					"background-color": "'green'",
					"color": "'red'"
				},
			},
		],
		"parsingErrors": [],
	};

	expect(JSON.parse(JSON.stringify(parseCSS(css, {columns: true})))).toStrictEqual(ast);
});

test('combine & columns', () => {
	const css = `foo,\nbar,\nbaz { color: 'red'; background-color: 'green'; }`;
	const ast = {
		"type": "root",
		"rules": [
			{
				"type": "rule",
				"foo,bar,baz": {
					"background-color": "'green'",
					"color": "'red'"
				},
			},
		],
		"parsingErrors": [],
	};

	expect(JSON.parse(JSON.stringify(parseCSS(css, {combine: true, columns: true})))).toStrictEqual(ast);
});

test('position & combine & columns', () => {
	const css = `foo,\nbar,\nbaz { color: 'red'; background-color: 'green'; }`;
	const ast = {
		"type": "root",
		"rules": [
			{
				"type": "rule",
				"foo,bar,baz": {
					"background-color": "'green'",
					"color": "'red'"
				},
				"position": {
					"end": {"column": 49, "line": 3},
					"start": {"column": 1, "line": 1}
				},
			},
		],
		"parsingErrors": [],
	};

	expect(JSON.parse(JSON.stringify(parseCSS(css, {position: true, combine: true, columns: true})))).toStrictEqual(ast);
});

test('error', () => {
	const css = `~!@#$%^&*()+-*/=_`;
	const ast = {
		"type": "root",
		"rules": [{
			"type": "rule",
			"selectors": ["~!@#$%^&*()+-*/=_"]
		}],
		"parsingErrors": [{
			"column": 18,
			"line": 1,
			"reason": "missing '{'",
			"source": ""
		}],
	};

	expect(JSON.parse(JSON.stringify(parseCSS(css, {silent: true})))).toStrictEqual(ast);

	let hasError = false;

	expect(hasError).toBe(false);

	try {
		parseCSS(css);
	} catch (e) {
		hasError = true;
	}

	expect(hasError).toBe(true);
});