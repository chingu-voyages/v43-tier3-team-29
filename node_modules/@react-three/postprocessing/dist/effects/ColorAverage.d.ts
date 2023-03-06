import { ColorAverageEffect, BlendFunction } from 'postprocessing';
import React from 'react';
export declare type ColorAverageProps = Partial<{
    blendFunction: BlendFunction;
}>;
export declare const ColorAverage: React.ForwardRefExoticComponent<Partial<{
    blendFunction: BlendFunction;
}> & React.RefAttributes<ColorAverageEffect>>;
