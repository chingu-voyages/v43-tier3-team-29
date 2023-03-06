import React from 'react';
import { ChromaticAberrationEffect } from 'postprocessing';
import { ReactThreeFiber } from '@react-three/fiber';
export declare type ChromaticAberrationProps = ConstructorParameters<typeof ChromaticAberrationEffect>[0] & Partial<{
    offset: ReactThreeFiber.Vector2;
}>;
export declare const ChromaticAberration: React.ForwardRefExoticComponent<{
    blendFunction?: import("postprocessing").BlendFunction;
    offset?: import("three").Vector2;
} & Partial<{
    offset: ReactThreeFiber.Vector2;
}> & React.RefAttributes<ChromaticAberrationEffect>>;
