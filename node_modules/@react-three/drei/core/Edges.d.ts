/// <reference types="react" />
import { ReactThreeFiber } from '@react-three/fiber';
declare type Props = JSX.IntrinsicElements['lineSegments'] & {
    threshold?: number;
    color?: ReactThreeFiber.Color;
};
export declare function Edges({ userData, children, geometry, threshold, color, ...props }: Props): JSX.Element;
export {};
