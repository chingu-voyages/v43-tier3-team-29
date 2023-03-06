import React from 'react';
import { GridEffect } from 'postprocessing';
export declare const Grid: React.ForwardRefExoticComponent<Partial<{
    blendFunction: import("postprocessing").BlendFunction;
    scale: number;
    lineWidth: number;
}> & Partial<{
    size: {
        width: number;
        height: number;
    };
}> & React.RefAttributes<GridEffect>>;
