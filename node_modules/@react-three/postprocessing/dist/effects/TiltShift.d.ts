/// <reference types="react" />
import { TiltShiftEffect, BlendFunction } from 'postprocessing';
export declare const TiltShift: import("react").ForwardRefExoticComponent<{
    blendFunction?: BlendFunction;
    offset?: number;
    rotation?: number;
    focusArea?: number;
    feather?: number;
    bias?: number;
    kernelSize?: KernelSize;
    resolutionScale?: number;
    resolutionX?: Resolution;
    resolutionY?: Resolutio;
} & Partial<{
    blendFunction: BlendFunction;
    opacity: number;
}> & import("react").RefAttributes<typeof TiltShiftEffect>>;
