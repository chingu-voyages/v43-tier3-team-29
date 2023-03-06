/// <reference types="react" />
import { ScanlineEffect, BlendFunction } from 'postprocessing';
export declare const Scanline: import("react").ForwardRefExoticComponent<{
    blendFunction?: BlendFunction;
    density?: number;
} & Partial<{
    blendFunction: BlendFunction;
    opacity: number;
}> & import("react").RefAttributes<typeof ScanlineEffect>>;
