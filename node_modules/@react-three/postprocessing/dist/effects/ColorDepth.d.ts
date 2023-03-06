/// <reference types="react" />
import { ColorDepthEffect } from 'postprocessing';
export declare const ColorDepth: import("react").ForwardRefExoticComponent<{
    blendFunction?: import("postprocessing").BlendFunction;
    bits?: number;
} & Partial<{
    blendFunction: import("postprocessing").BlendFunction;
    opacity: number;
}> & import("react").RefAttributes<typeof ColorDepthEffect>>;
