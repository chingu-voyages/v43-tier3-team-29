import React from 'react';
import { SSAOEffect, BlendFunction } from 'postprocessing';
export declare const SSAO: React.ForwardRefExoticComponent<{
    blendFunction?: BlendFunction;
    samples?: number;
    rings?: number;
    distanceThreshold?: number;
    distanceFalloff?: number;
    rangeThreshold?: number;
    rangeFalloff?: number;
    luminanceInfluence?: number;
    radius?: number;
    scale?: number;
    bias?: number;
    intensity?: number;
    color?: string;
} & React.RefAttributes<SSAOEffect>>;
