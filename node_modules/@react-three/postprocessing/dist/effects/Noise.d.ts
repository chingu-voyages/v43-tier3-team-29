/// <reference types="react" />
import { NoiseEffect, BlendFunction } from 'postprocessing';
export declare const Noise: import("react").ForwardRefExoticComponent<{
    blendFunction?: BlendFunction;
    premultiply?: boolean;
} & Partial<{
    blendFunction: BlendFunction;
    opacity: number;
}> & import("react").RefAttributes<typeof NoiseEffect>>;
