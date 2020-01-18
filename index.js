module.exports.parseCSS = require('./src/parseCSS');
module.exports.searchCSS = require('./src/searchCSS');

if (typeof window === 'object') {
	window.parseCSS = module.exports.parseCSS;
	window.searchCSS = module.exports.searchCSS;
}