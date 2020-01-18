# Search CSS
Parse and Search CSS for at rules, selectors, properties and/or values

## API
```javascript
parseCss(css = '' /* css code */, options = {
    columns: false, // (bool) merge property/value array into a single object
    combine: false, // (bool) join selectors array into a comma delimited string
    position: false, // (bool) return rule's start and end positions 
    silent: false, // (bool) saves any errors into `errorsList` instead of throwing a JavaScript error
    source: null, // (string|null) the path to the file containing css. Used for errors and source maps.
})
searchCSS(ast = {} /* css ast object */, query = {} /* search rules */, options = {
    singleDeclaration: false, // (bool) only search selectors that have one property. Used for searching utility classes
    specialChar: '|', // (string) wildcard char(s) for query values 
})
searchCSS(...[]).getMatches();
searchCSS(...[]).toString(options = {
    groupAtRules: false, // (bool) group the same consecutive at rules together
    indent: 4, // (int) how many spaces to indent when nesting 
    lineDelimiter: "\n", // (string) new line delimiter
    selectorDelimiter: ', ', // (string) the character(s) to join selectors by
});
```

## ReworkCSS
The `parseCss` function is mostly a fork of TJ Holowaychuk's CSS parser (https://github.com/reworkcss/css) with some minor modifications.