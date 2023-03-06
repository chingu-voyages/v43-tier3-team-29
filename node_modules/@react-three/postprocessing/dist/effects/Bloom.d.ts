/// <reference types="react" />
import { BloomEffect, BlendFunction } from 'postprocessing';
export declare const Bloom: import("react").ForwardRefExoticComponent<{
    mipmapBlur?: boolean;
    radius?: number;
    levels?: number;
    blendFunction?: BlendFunction;
    luminanceThreshold?: number;
    luminanceSmoothing?: number;
    intensity?: number;
    width?: number;
    height?: number;
    kernelSize?: KernelSize;
} & Partial<{
    blendFunction: BlendFunction;
    opacity: number;
}> & import("react").RefAttributes<typeof BloomEffect>>;
