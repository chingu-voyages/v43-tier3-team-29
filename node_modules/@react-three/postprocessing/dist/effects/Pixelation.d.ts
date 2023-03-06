import React from 'react';
import { PixelationEffect } from 'postprocessing';
export declare type PixelationProps = {
    granularity?: number;
};
export declare const Pixelation: React.ForwardRefExoticComponent<PixelationProps & React.RefAttributes<PixelationEffect>>;
