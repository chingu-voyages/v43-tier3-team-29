import { DepthOfFieldEffect } from 'postprocessing';
import React from 'react';
import { ReactThreeFiber } from '@react-three/fiber';
import { Texture, Vector3 } from 'three';
export declare const DepthOfField: React.ForwardRefExoticComponent<{
    blendFunction?: import("postprocessing").BlendFunction;
    focusDistance?: number;
    focalLength?: number;
    bokehScale?: number;
    width?: number;
    height?: number;
} & Partial<{
    target: ReactThreeFiber.Vector3;
    depthTexture: {
        texture: Texture;
        packing: number;
    };
    blur: number;
}> & React.RefAttributes<DepthOfFieldEffect>>;
