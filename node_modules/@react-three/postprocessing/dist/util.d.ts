import React, { MutableRefObject } from 'react';
import { Vector2, Object3D } from 'three';
import { Effect, BlendFunction } from 'postprocessing';
declare type ObjectRef = MutableRefObject<Object3D>;
export declare const resolveRef: (ref: Object3D | ObjectRef) => Object3D<import("three").Event>;
export declare const wrapEffect: <T extends new (...args: any[]) => Effect>(effectImpl: T, defaultBlendMode?: BlendFunction) => React.ForwardRefExoticComponent<React.PropsWithoutRef<ConstructorParameters<T>[0] & Partial<{
    blendFunction: BlendFunction;
    opacity: number;
}>> & React.RefAttributes<T>>;
export declare const useVector2: (props: any, key: string) => Vector2;
export {};
