import { GodRaysEffect } from 'postprocessing';
import React from 'react';
import { Mesh, Points } from 'three';
export declare const GodRays: React.ForwardRefExoticComponent<{
    blendFunction?: import("postprocessing").BlendFunction;
    samples?: number;
    density?: number;
    decay?: number;
    weight?: number;
    exposure?: number;
    clampMax?: number;
    width?: number;
    height?: number;
    kernelSize?: KernelSize;
    blur?: number;
} & {
    sun: Mesh | Points;
} & React.RefAttributes<GodRaysEffect>>;
