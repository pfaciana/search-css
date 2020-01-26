# Search CSS
Parse and Search CSS for at-rules, selectors, properties and/or values

## API
```javascript
const ast = parseCss(css = '' /* css code */, options = {
    columns: false, // (bool) merge property/value array into a single object
    combine: false, // (bool) join selectors array into a comma delimited string
    position: false, // (bool) return rule's start and end positions 
    silent: false, // (bool) saves any errors into `errorsList` instead of throwing a JavaScript error
    source: null, // (string|null) the path to the file containing css. Used for errors and source maps.
}); /*
Returns `ast` (object) an ast object representation of the css which can be searched. Pass this to searchCSS(ast, query, options);
*/

const matches = searchCSS(ast = {} /* css ast object */, query = {} /* search rules */, options = {
    declarationMax: false, // (bool|int). Search only declarations with a maximum number of properties. Helpful for searching utility classes.
    specialChar: '|', // (string) wildcard char(s) for query values 
}); /*
Returns `matches` (array) an array of the matched css rules.

`matches.error` (null|string) If exists, the first error found while searching 

`matches.toString()` (function) converts the matches array into a human readable string
*/

matches.toString(options = { 
    nestAtRules: true, // (bool) visually indent selectors within an at-rule
    nestSelectorRules: true, // (bool) visually indent declarations within a rule
    orderAtRules: false, // (bool) group the at-rules together preserving the order they appear in the code
    orderProperties: false, // (bool) order the properties in a declaration based on the order set in the `cssPropertyOrder.js` file
    indent: 4, // (int) how many spaces to indent when nesting 
    selectorDelimiter: ', ', // (string) the character(s) to join/merge selectors
});
```

## ReworkCSS
The `parseCss` function is mostly a fork of TJ Holowaychuk's CSS parser (https://github.com/reworkcss/css) with some minor modifications.