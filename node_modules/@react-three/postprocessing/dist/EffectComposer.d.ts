import { TextureDataType } from 'three';
import React from 'react';
import { EffectComposer as EffectComposerImpl, NormalPass, DepthDownsamplingPass } from 'postprocessing';
export declare const EffectComposerContext: React.Context<{
    composer: EffectComposerImpl;
    normalPass: NormalPass | null;
    downSamplingPass: DepthDownsamplingPass | null;
    camera: THREE.Camera;
    scene: THREE.Scene;
    resolutionScale?: number;
}>;
export declare type EffectComposerProps = {
    enabled?: boolean;
    children: JSX.Element | JSX.Element[];
    depthBuffer?: boolean;
    disableNormalPass?: boolean;
    stencilBuffer?: boolean;
    autoClear?: boolean;
    resolutionScale?: number;
    multisampling?: number;
    frameBufferType?: TextureDataType;
    renderPriority?: number;
    camera?: THREE.Camera;
    scene?: THREE.Scene;
};
export declare const EffectComposer: React.MemoExoticComponent<React.ForwardRefExoticComponent<EffectComposerProps & React.RefAttributes<unknown>>>;
