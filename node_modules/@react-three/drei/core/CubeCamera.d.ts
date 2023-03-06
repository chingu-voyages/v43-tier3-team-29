import { Fog, FogExp2, Texture } from 'three';
import * as React from 'react';
declare type Props = JSX.IntrinsicElements['group'] & {
    frames?: number;
    resolution?: number;
    near?: number;
    far?: number;
    envMap?: THREE.Texture;
    fog?: Fog | FogExp2;
    children: (tex: Texture) => React.ReactNode;
};
export declare function CubeCamera({ children, fog, frames, resolution, near, far, envMap, ...props }: Props): JSX.Element;
export {};
