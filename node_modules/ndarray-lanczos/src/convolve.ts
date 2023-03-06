import type { NdArray } from 'ndarray';

const fixedFracBits = 14;

const clamp = (v: number): number => v < 0 ? 0 : (v > 255 ? 255 : v);

export const convolve = (src: NdArray, dst: NdArray, filters: Int16Array) => {
	const [_, srcHeight] = src.shape;
	const [dstWidth] = dst.shape;

	// For each row
	for (let srcY = 0; srcY < srcHeight; srcY++) {
		const dstY = srcY;

		// Apply precomputed filters to each destination row point
		let filterPtr = 0;
		for (let dstX = 0; dstX < dstWidth; dstX++) {
			// Get the filter that determines the current output pixel.
			let srcX = filters[filterPtr++];

			let r = 0;
			let g = 0;
			let b = 0;
			let a = 0;

			// Apply the filter to the row to get the destination pixel r, g, b, a
			for (let filterSize = filters[filterPtr++]; filterSize > 0; filterSize--) {
				const filterValue = filters[filterPtr++];

				r = ( r + filterValue * src.get(srcX, srcY, 0) );
				g = ( g + filterValue * src.get(srcX, srcY, 1) );
				b = ( b + filterValue * src.get(srcX, srcY, 2) );
				a = ( a + filterValue * src.get(srcX, srcY, 3) );

				srcX++;
			}

			// Bring this value back in range. All of the filter scaling factors
			// are in fixed point with fixedFracBits bits of fractional part.
			//
			// (!) Add 1/2 of value before clamping to get proper rounding. In other
			// case brightness loss will be noticeable if you resize image with white
			// border and place it on white background.
			dst.set(dstX, dstY, 0, clamp( ( r + ( 1 << 13 ) ) >> fixedFracBits ) );
			dst.set(dstX, dstY, 1, clamp( ( g + ( 1 << 13 ) ) >> fixedFracBits ) );
			dst.set(dstX, dstY, 2, clamp( ( b + ( 1 << 13 ) ) >> fixedFracBits ) );
			dst.set(dstX, dstY, 3, clamp( ( a + ( 1 << 13 ) ) >> fixedFracBits ) );
		}
	}
}
