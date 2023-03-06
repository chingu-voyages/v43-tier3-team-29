import getPixelsInternal from 'get-pixels';
import type { NdArray } from 'ndarray';
import savePixelsInternal from 'save-pixels';

/**
 * Decodes image data to an `ndarray`.
 *
 * MIME type is optional when given a path or URL, and required when given a Uint8Array.
 *
 * Accepts `image/png` or `image/jpeg` in Node.js, and additional formats on browsers with
 * the necessary support in Canvas 2D.
 *
 * @param data
 * @param mimeType `image/jpeg`, `image/png`, etc.
 * @returns
 */
async function getPixels (data: string | Uint8Array, mimeType?: string): Promise<NdArray> {
    // In Node.js, get-pixels needs a Buffer and won't accept Uint8Array.
    if (data instanceof Uint8Array && typeof Buffer !== 'undefined') {
        data = Buffer.from(data);
    }

    return new Promise((resolve, reject) => {
        getPixelsInternal(data, mimeType!, (err: Error | null, pixels: NdArray) => {
            if (pixels && !err) {
                resolve(pixels);
            } else {
                reject(err);
            }
        });
    });
}

/**
 * Encodes an `ndarray` as image data in the given format.
 *
 * If the source `ndarray` was constructed manually with default stride, use
 * `ndarray.transpose(1, 0)` to reshape it and ensure an identical result from getPixels(). For an
 * ndarray created by getPixels(), this isn't necessary.
 *
 * Accepts `image/png` or `image/jpeg` in Node.js, and additional formats on browsers with
 * the necessary support in Canvas 2D.
 *
 * @param pixels ndarray of shape W x H x 4.
 * @param mimeType `image/jpeg`, `image/png`, etc.
 * @returns
 */
async function savePixels (pixels: NdArray, mimeType: string): Promise<Uint8Array> {
    return new Promise((resolve, reject) => {
        const chunks: Uint8Array[] = [];
        const internalType = mimeType.replace('image/', '') as 'png' | 'gif';
        savePixelsInternal(pixels, internalType)
            .on('data', (d: Uint8Array) => chunks.push(d))
            .on('end', () => resolve(concat(chunks)))
            .on('error', (e: Error) => reject(e));
    });
}

function concat (arrays: Uint8Array[]): Uint8Array {
    let totalByteLength = 0;
    for (const array of arrays) {
        totalByteLength += array.byteLength;
    }

    const result = new Uint8Array(totalByteLength);

    let byteOffset = 0;
    for (const array of arrays) {
        result.set(array, byteOffset);
        byteOffset += array.byteLength;
    }

    return result;
}

export {getPixels, savePixels};
