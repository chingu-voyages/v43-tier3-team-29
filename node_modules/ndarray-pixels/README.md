# ndarray-pixels

[![Latest NPM release](https://img.shields.io/npm/v/ndarray-pixels.svg)](https://www.npmjs.com/package/ndarray-pixels)
[![License](https://img.shields.io/badge/license-MIT-007ec6.svg)](https://github.com/donmccurdy/ndarray-pixels/blob/main/LICENSE)
[![Minzipped size](https://badgen.net/bundlephobia/minzip/ndarray-pixels)](https://bundlephobia.com/result?p=ndarray-pixels)
[![CI](https://github.com/donmccurdy/ndarray-pixels/workflows/CI/badge.svg?branch=main&event=push)](https://github.com/donmccurdy/ndarray-pixels/actions?query=workflow%3ACI)

Convert [ndarray](https://www.npmjs.com/package/ndarray) ↔ image data, on Web and Node.js.

Designed to be used with [other ndarray-based packages](http://scijs.net/packages/).

In Node.js, this package uses [get-pixels](https://www.npmjs.com/package/get-pixels) and [save-pixels](https://www.npmjs.com/package/save-pixels). While both packages could be used on the web, they require polyfills for Node.js builtins. Browserify handles that automatically, but more modern bundlers do not. Moreover, the polyfills increase package size significantly. To avoid these problems, web builds of `ndarray-pixels` reimplement the same functionality with the more portable Canvas API.

## Supported Formats

| Platform | JPEG | PNG | Other |
|----------|------|-----|-------|
| Node.js  | ✅   | ✅ | ❌      |
| Web      | ✅   | ✅ | Based on [browser support](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob) |

### Known Bugs

- [ ] Web implementation (Canvas 2D) premultiplies alpha.

## Quickstart

```
npm install --save ndarray-pixels
```

### Web

```javascript
import { getPixels, savePixels } from 'ndarray-pixels';

const bytesIn = await fetch('./input.png')
    .then((res) => res.arrayBuffer())
    .then((arrayBuffer) => new Uint8Array(arrayBuffer));

const pixels = await getPixels(bytesIn, 'image/png'); // Uint8Array -> ndarray

// ... modify ndarray ...

const bytesOut = await savePixels(pixels, 'image/png'); // ndarray -> Uint8Array
```


### Node.js

```javascript
const fs = require('fs');
const { getPixels, savePixels } = require('ndarray-pixels');

const bufferIn = fs.readFileSync('./input.png');
const pixels = await getPixels(bufferIn, 'image/png'); // Uint8Array -> ndarray

// ... modify ndarray ...

const bufferOut = await savePixels(pixels, 'image/png'); // ndarray -> Uint8Array
fs.writeFileSync('./output.png', bufferOut);
```

## API

<!--- API BEGIN --->

### getPixels

▸ **getPixels**(`data`, `mimeType?`): `Promise`<`NdArray`\>

Decodes image data to an `ndarray`.

MIME type is optional when given a path or URL, and required when given a Uint8Array.

Accepts `image/png` or `image/jpeg` in Node.js, and additional formats on browsers with
the necessary support in Canvas 2D.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `string` \| `Uint8Array` |  |
| `mimeType?` | `string` | `image/jpeg`, `image/png`, etc. |

#### Returns

`Promise`<`NdArray`\>

#### Defined in

[index.ts:17](https://github.com/donmccurdy/ndarray-pixels/blob/3676ddc/src/index.ts#L17)

___

### savePixels

▸ **savePixels**(`pixels`, `mimeType`): `Promise`<`Uint8Array`\>

Encodes an `ndarray` as image data in the given format.

If the source `ndarray` was constructed manually with default stride, use
`ndarray.transpose(1, 0)` to reshape it and ensure an identical result from getPixels(). For an
ndarray created by getPixels(), this isn't necessary.

Accepts `image/png` or `image/jpeg` in Node.js, and additional formats on browsers with
the necessary support in Canvas 2D.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pixels` | `NdArray`<`Data`<`number`\>\> | ndarray of shape W x H x 4. |
| `mimeType` | `string` | `image/jpeg`, `image/png`, etc. |

#### Returns

`Promise`<`Uint8Array`\>

#### Defined in

[index.ts:48](https://github.com/donmccurdy/ndarray-pixels/blob/3676ddc/src/index.ts#L48)
<!--- API END --->
