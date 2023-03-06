import * as React from 'react';
import * as THREE from 'three';
import * as FIBER from '@react-three/fiber';
declare type DecalProps = Omit<JSX.IntrinsicElements['meshStandardMaterial'], 'children'> & {
    debug?: boolean;
    mesh?: React.MutableRefObject<THREE.Mesh>;
    position?: FIBER.Vector3;
    rotation?: FIBER.Euler | number;
    scale?: FIBER.Vector3;
    map?: THREE.Texture;
    children?: React.ReactNode;
};
export declare function Decal({ debug, mesh, children, position, rotation, scale, ...props }: DecalProps): JSX.Element;
export {};
