import React from 'react';
import { SMAAEffect } from 'postprocessing';
export declare const SMAA: React.ForwardRefExoticComponent<{
    preset?: number;
    edgeDetectionMode?: number;
} & React.RefAttributes<SMAAEffect>>;
