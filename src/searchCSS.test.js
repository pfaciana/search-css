const mockAst = require('./__snapshots__/mock-ast').rules;
const searchCSS = require('./searchCSS');
const {normalizeCondition, isValidCondition, normalizeQuery} = searchCSS;

describe('normalizeCondition', () => {
	const table = [
		['exact', 'some string'],
		['regex', /^[^:]+$/i, 'regex'],
		['regex string', '/^[^:]+$/i', 'regex', /^[^:]+$/i],
		['bad regex', '/^[^:]+$'],
		['starts', 'start|', 'starts', 'start'],
		['ends', '|end', 'ends', 'end'],
		['has', '|middle|', 'has', 'middle'],
		['array', 'a|b|c', 'in', ['a', 'b', 'c']],
		['existing array', ['a', 'b', 'c'], 'in'],
		['special char', 'start$', 'starts', 'start', '$'],
		['special multi char', '{!}middle{!}', 'has', 'middle', '{!}'],
		['not trimmed (end)', '{!}middle{!} ', 'ends', 'middle{!} ', '{!}'],
		['not trimmed (both)', ' {!}middle{!} ', 'in', [' ', 'middle', ' '], '{!}'],
	];

	test.each(table)('%p', (name, input, type = 'exact', value = input, specialChar = '|') => {
			expect(normalizeCondition(input, specialChar)).toStrictEqual({type, value});
		},
	);
});

describe('isValidCondition', () => {
	const table = [
		['exact valid', 'exact', 'some string', 'some string', true],
		['exact invalid', 'exact', 'some string', 'some other string', false],
		['regex valid', 'regex', /^[^:]+$/i, 'p-m-2', true],
		['regex invalid', 'regex', /^[^:]+$/i, 'p:m-2', false],
		['starts valid', 'starts', 'a b c', 'a b c d', true],
		['starts invalid', 'starts', 'a b c', 'w x y z', false],
		['ends valid', 'ends', 'x y z', 'w x y z', true],
		['ends invalid', 'ends', 'x y z', 'a b c d', false],
		['has valid', 'has', 'm n o', 'l m n o p', true],
		['has invalid', 'has', 'm n o', 'p o n m l', false],
		['array valid', 'in', ['a', 'b', 'c'], 'b', true],
		['array invalid', 'in', ['a', 'b', 'c'], 'y', false],
	];

	test.each(table)('%p', (name, type, pattern, subject, result) => {
			expect(isValidCondition({type, value: pattern}, subject)).toStrictEqual(result);
		},
	);
});

describe('normalizeQuery', () => {
	const table = [
		['simple', {property: 'margin'}, {property: {type: 'exact', value: 'margin'}}],
		['ignore extra', {property: 'margin', ignore: 'field'}, {property: {type: 'exact', value: 'margin'}}],
		['already normalized', {property: {type: 'exact', value: 'margin'}}],
		['bad normalized', {property: {type: 'exact'}}, {}],
		['mixed', {property: {type: 'exact'}, value: '|%'}, {value: {type: 'ends', value: '%'}}],
	];

	test.each(table)('%p', (name, query, fullQuery = query, specialChar = '|') => {
			expect(normalizeQuery(query, specialChar)).toStrictEqual(fullQuery);
		},
	);
});

describe('searchCSS', () => {
	const table = [
		['property', {atrules: null, selector: null, property: 'color', value: null}, 3, 2],
		['property ends', {atrules: null, selector: null, property: '|color', value: null}, 7, 6],
		['value regex', {atrules: null, selector: null, property: null, value: '/^#[0-9a-f]{3,6}$/i'}, 5, 5],
		['selector', {atrules: null, selector: '.a.b .c .d', property: null, value: null}, 1, 0],
		['selector starts', {atrules: null, selector: '.module|', property: null, value: null}, 4, 3],
		['@root & property ends', {atrules: '@root', selector: null, property: '|color', value: null}, 2, 2],
		['@keyframes & property ends', {atrules: '@keyframes pulse', selector: null, property: '|color', value: null}, 2, 2],
		['combined atrules', {atrules: '@root|@keyframes pulse', selector: null, property: '|color', value: null}, 4, 4],
		['nested atrules', {atrules: '@keyframes pulse, @media (min-width: 50em), @supports (flex-wrap: wrap)', selector: null, property: '|color', value: null}, 2, 2],
		['nested atrules & property ends', {atrules: '@media (min-width: 50em), @supports (flex-wrap: wrap)', selector: null, property: '|color', value: null}, 1, 0],
		['combined & nested atrules', {atrules: '@media (min-width: 50em), @supports (flex-wrap: wrap)|@root', selector: null, property: '|color', value: null}, 3, 2],
		['empty', {ignore: 'invalid key'}, 0, 0, 'Valid keys are missing'],
	];

	test.each(table)('%p', (name, query, count, singleCount, error = null) => {
			const searchAllDeclarations = searchCSS(mockAst, query, {declarationMax: false});
			const searchSingleDeclarations = searchCSS(mockAst, query, {declarationMax: 1});

			expect(searchAllDeclarations.length).toStrictEqual(count);
			expect(searchSingleDeclarations.length).toStrictEqual(singleCount);

			expect(searchAllDeclarations.toString({orderAtRules: false, indent: 2})).toMatchSnapshot();
			expect(searchSingleDeclarations.toString({orderAtRules: false, indent: 2})).toMatchSnapshot();

			expect(searchAllDeclarations.toString({orderAtRules: true, indent: 2})).toMatchSnapshot();
			expect(searchSingleDeclarations.toString({orderAtRules: true, indent: 2})).toMatchSnapshot();

			expect(searchAllDeclarations.error).toStrictEqual(error);
			expect(searchSingleDeclarations.error).toStrictEqual(error);
		},
	);
});

