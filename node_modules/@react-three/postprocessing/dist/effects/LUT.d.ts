import { LUTEffect } from 'postprocessing';
import React from 'react';
import { Texture } from 'three';
export declare const LUT: React.ForwardRefExoticComponent<{
    blendFunction?: import("postprocessing").BlendFunction;
    tetrahedralInterpolation?: boolean;
} & {
    lut: Texture;
} & React.RefAttributes<LUTEffect>>;
