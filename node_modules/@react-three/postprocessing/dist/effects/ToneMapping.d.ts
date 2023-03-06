/// <reference types="react" />
import { ToneMappingEffect } from 'postprocessing';
export declare const ToneMapping: import("react").ForwardRefExoticComponent<{
    blendFunction?: import("postprocessing").BlendFunction;
    adaptive?: boolean;
    resolution?: number;
    middleGrey?: number;
    maxLuminance?: number;
    averageLuminance?: number;
    adaptationRate?: number;
} & Partial<{
    blendFunction: import("postprocessing").BlendFunction;
    opacity: number;
}> & import("react").RefAttributes<typeof ToneMappingEffect>>;
