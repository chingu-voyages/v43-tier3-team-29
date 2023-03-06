/// <reference types="react" />
import { DepthEffect } from 'postprocessing';
export declare const Depth: import("react").ForwardRefExoticComponent<{
    blendFunction?: import("postprocessing").BlendFunction;
    inverted?: boolean;
} & Partial<{
    blendFunction: import("postprocessing").BlendFunction;
    opacity: number;
}> & import("react").RefAttributes<typeof DepthEffect>>;
