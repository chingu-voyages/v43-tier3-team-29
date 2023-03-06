/// <reference types="react" />
import { DotScreenEffect } from 'postprocessing';
export declare const DotScreen: import("react").ForwardRefExoticComponent<{
    blendFunction?: import("postprocessing").BlendFunction;
    angle?: number;
    scale?: number;
} & Partial<{
    blendFunction: import("postprocessing").BlendFunction;
    opacity: number;
}> & import("react").RefAttributes<typeof DotScreenEffect>>;
