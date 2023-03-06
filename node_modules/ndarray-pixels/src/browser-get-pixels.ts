import ndarray from 'ndarray';
import type { NdArray } from 'ndarray';

export type GetPixelsCallback = (err: string | Event | null, pixels?: NdArray) => void;

export default getPixels;

function getPixels(path: string, callback: GetPixelsCallback): void;
function getPixels(path: string | Uint8Array, type: string, callback: GetPixelsCallback): void
function getPixels(path: string | Uint8Array, typeOrCallback: string | GetPixelsCallback, callback?: GetPixelsCallback): void {
	callback = callback || typeOrCallback as GetPixelsCallback;

	// Construct a Blob URL for Uint8Array inputs.
	if (path instanceof Uint8Array) {
		if (typeof typeOrCallback !== 'string') {
			throw new Error('[ndarray-pixels] Type must be given for Uint8Array image data');
		}
		const blob = new Blob([path], {type: typeOrCallback});
		path = URL.createObjectURL(blob);
	}

	// Decode image with Canvas API.
	const img = new Image();
	img.crossOrigin = 'anonymous';
	img.onload = function() {
		URL.revokeObjectURL(path as string);

		const canvas = document.createElement('canvas');
		canvas.width = img.width;
		canvas.height = img.height;
		const context = canvas.getContext('2d')!;
		context.drawImage(img, 0, 0);
		const pixels = context.getImageData(0, 0, img.width, img.height)
		callback!(null, ndarray(new Uint8Array(pixels.data), [img.width, img.height, 4], [4, 4*img.width, 1], 0));
	}
	img.onerror = (err) => {
		URL.revokeObjectURL(path as string);
		callback!(err);
	};
	img.src = path;
}
