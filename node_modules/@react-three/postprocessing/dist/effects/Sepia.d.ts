/// <reference types="react" />
import { SepiaEffect } from 'postprocessing';
export declare const Sepia: import("react").ForwardRefExoticComponent<{
    blendFunction?: import("postprocessing").BlendFunction;
    intensity?: number;
} & Partial<{
    blendFunction: import("postprocessing").BlendFunction;
    opacity: number;
}> & import("react").RefAttributes<typeof SepiaEffect>>;
