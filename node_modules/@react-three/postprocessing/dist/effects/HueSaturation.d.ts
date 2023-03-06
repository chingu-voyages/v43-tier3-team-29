/// <reference types="react" />
import { HueSaturationEffect } from 'postprocessing';
export declare const HueSaturation: import("react").ForwardRefExoticComponent<{
    blendFunction?: import("postprocessing").BlendFunction;
    hue?: number;
    saturation?: number;
} & Partial<{
    blendFunction: import("postprocessing").BlendFunction;
    opacity: number;
}> & import("react").RefAttributes<typeof HueSaturationEffect>>;
