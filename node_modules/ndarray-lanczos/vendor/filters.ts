const fixedFracBits = 14

const filterValue = ( x: number, a: 2 | 3 ) => {
	if ( x <= -a || x >= a ) return 0

	// appears to do nothing?
	// if ( x > -1.19209290e-07 && x < 1.19209290e-07 ) return 1

	const xPi = x * Math.PI

	return ( Math.sin( xPi ) / xPi ) * Math.sin( xPi / a ) / ( xPi / a )
}

const toFixedPoint = ( value: number ) =>
Math.round( value * ( ( 1 << fixedFracBits ) - 1 ) )

export const filters = ( srcSize: number, destSize: number, scale: number, offset: number, use2: boolean ) => {
	const a = use2 ? 2 : 3
	const scaleInverted = 1 / scale
	const scaleClamped = Math.min( 1, scale ) // For upscale

	// Filter window (averaging interval), scaled to src image
	const srcWindow = a / scaleClamped

	const maxFilterElementSize = Math.floor( ( srcWindow + 1 ) * 2 )
	const packedFilter = new Int16Array( ( maxFilterElementSize + 2 ) * destSize )
	let packedFilterPtr = 0

	// For each destination pixel calculate source range and built filter values
	for ( let destPixel = 0; destPixel < destSize; destPixel++ ) {

		// Scaling should be done relative to central pixel point
		const sourcePixel = ( destPixel + 0.5 ) * scaleInverted + offset
		const sourceFirst = Math.max( 0, Math.floor( sourcePixel - srcWindow ) )
		const sourceLast = Math.min( srcSize - 1, Math.ceil( sourcePixel + srcWindow ) )

		const filterElementSize = sourceLast - sourceFirst + 1
		const floatFilter = new Float32Array( filterElementSize )
		const fxpFilter = new Int16Array( filterElementSize )

		let total = 0

		// Fill filter values for calculated range
		let index = 0
		for ( let pixel = sourceFirst; pixel <= sourceLast; pixel++ ) {
			const floatValue = filterValue( ( ( pixel + 0.5 ) - sourcePixel ) * scaleClamped, a )

			total += floatValue
			floatFilter[ index ] = floatValue

			index++
		}

		// Normalize filter, convert to fixed point and accumulate conversion error
		let filterTotal = 0

		for ( let index = 0; index < floatFilter.length; index++ ) {
			const filterValue = floatFilter[ index ] / total

			filterTotal += filterValue
			fxpFilter[ index ] = toFixedPoint( filterValue )
		}

		// Compensate normalization error, to minimize brightness drift
		fxpFilter[ destSize >> 1 ] += toFixedPoint( 1 - filterTotal )

		//
		// Now pack filter to useable form
		//
		// 1. Trim heading and tailing zero values, and compensate shitf/length
		// 2. Put all to single array in this format:
		//
		//    [ pos shift, data length, value1, value2, value3, ... ]
		//
		let leftNotEmpty = 0
		while ( leftNotEmpty < fxpFilter.length && fxpFilter[ leftNotEmpty ] === 0 ) {
			leftNotEmpty++
		}

		let rightNotEmpty = fxpFilter.length - 1
		while ( rightNotEmpty > 0 && fxpFilter[ rightNotEmpty ] === 0 ) {
			rightNotEmpty--
		}

		const filterShift = sourceFirst + leftNotEmpty
		const filterSize = rightNotEmpty - leftNotEmpty + 1

		packedFilter[ packedFilterPtr++ ] = filterShift // shift
		packedFilter[ packedFilterPtr++ ] = filterSize // size

		packedFilter.set( fxpFilter.subarray( leftNotEmpty, rightNotEmpty + 1 ), packedFilterPtr )
		packedFilterPtr += filterSize
	}

	return packedFilter
}
