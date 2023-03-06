import { TextureEffect } from 'postprocessing';
import React from 'react';
export declare const Texture: React.ForwardRefExoticComponent<Partial<{
    blendFunction: import("postprocessing").BlendFunction;
    texture: import("three").Texture;
}> & {
    textureSrc: string;
} & React.RefAttributes<TextureEffect>>;
