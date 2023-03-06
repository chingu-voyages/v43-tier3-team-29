/// <reference types="react" />
import { BrightnessContrastEffect } from 'postprocessing';
export declare const BrightnessContrast: import("react").ForwardRefExoticComponent<{
    blendFunction?: import("postprocessing").BlendFunction;
    brightness?: number;
    contrast?: number;
} & Partial<{
    blendFunction: import("postprocessing").BlendFunction;
    opacity: number;
}> & import("react").RefAttributes<typeof BrightnessContrastEffect>>;
