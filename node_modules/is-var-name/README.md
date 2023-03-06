# is-var-name

[![npm version](https://img.shields.io/npm/v/is-var-name.svg)](https://www.npmjs.com/package/is-var-name)
[![Build Status](https://travis-ci.org/shinnn/is-var-name.svg?branch=master)](https://travis-ci.org/shinnn/is-var-name)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/is-var-name.svg)](https://coveralls.io/r/shinnn/is-var-name)

Check if a string can be used as a [JavaScript variable name](https://es5.github.io/x7.html#x7.6)

```javascript
isVarName('foo'); //=> true
isVarName('f o o'); //=> false
```

## Installation

[Use](https://docs.npmjs.com/cli/install) [npm](https://docs.npmjs.com/getting-started/what-is-npm).

```
npm install is-var-name
```

## API

```javascript
import isVarName from 'is-var-name';
```

### isVarName(*name*)

*name*: `string`  
Return: `boolean`

It returns `true` if [the string can be used as a valid JavaScript identifier name](https://mathiasbynens.be/notes/javascript-identifiers). If not, or the argument is not a string, it returns `false`.

```javascript
isVarName('______________'); //=> true
isVarName('å'); //=> true

isVarName('123'); //=> false
isVarName('↑→↓←'); //=> false
isVarName('_;'); //=> false
isVarName(''); //=> false

isVarName(['foo']); //=> false
isVarName(); //=> false
```

## Another solution

Instead of this module, you can use [the regular expression that matches valid variable names](https://gist.github.com/mathiasbynens/6334847#file-ecmascript-6-js).

### Regular expression pros

*is-var-name* uses [`Function` constructor](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Function) but regular expression doesn't.

According to [the ESLint documentation](https://eslint.org/docs/rules/no-new-func), `new Function()` is:

> considered by many to be a bad practice due to the difficult in debugging and reading these types of functions.

### Regular expression cons

Since the regular expression is too long ([about 16,000 characters](https://gist.githubusercontent.com/mathiasbynens/6334847/raw/4b78d62a29da1f340956aa102dffa6c4ac7e620e/ecmascript-6.js)), it increases the file size of your library or application.

## License

[ISC License](./LICENSE) © 2018 Shinnosuke Watanabe
