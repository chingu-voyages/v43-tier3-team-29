/// <reference types="react" />
import { VignetteEffect } from 'postprocessing';
export declare const Vignette: import("react").ForwardRefExoticComponent<{
    blendFunction?: import("postprocessing").BlendFunction;
    eskil?: boolean;
    offset?: number;
    darkness?: number;
} & Partial<{
    blendFunction: import("postprocessing").BlendFunction;
    opacity: number;
}> & import("react").RefAttributes<typeof VignetteEffect>>;
