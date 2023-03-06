import { GlitchEffect, GlitchMode } from 'postprocessing';
import React from 'react';
import { ReactThreeFiber } from '@react-three/fiber';
export declare type GlitchProps = ConstructorParameters<typeof GlitchEffect>[0] & Partial<{
    mode: typeof GlitchMode[keyof typeof GlitchMode];
    active: boolean;
    delay: ReactThreeFiber.Vector2;
    duration: ReactThreeFiber.Vector2;
    chromaticAberrationOffset: ReactThreeFiber.Vector2;
    strength: ReactThreeFiber.Vector2;
}>;
export declare const Glitch: React.ForwardRefExoticComponent<{
    blendFunction?: import("postprocessing").BlendFunction;
    chromaticAberrationOffset?: import("three").Vector2;
    delay?: import("three").Vector2;
    duration?: import("three").Vector2;
    strength?: import("three").Vector2;
    perturbationMap?: import("three").Texture;
    dtSize?: number;
    columns?: number;
    ratio?: number;
} & Partial<{
    mode: typeof GlitchMode[keyof typeof GlitchMode];
    active: boolean;
    delay: ReactThreeFiber.Vector2;
    duration: ReactThreeFiber.Vector2;
    chromaticAberrationOffset: ReactThreeFiber.Vector2;
    strength: ReactThreeFiber.Vector2;
}> & React.RefAttributes<GlitchEffect>>;
