import * as THREE from 'three';
interface VideoTextureProps extends HTMLVideoElement {
    unsuspend?: 'canplay' | 'canplaythrough' | 'loadstart' | 'loadedmetadata';
    start?: boolean;
}
export declare function useVideoTexture(src: string, props: Partial<VideoTextureProps>): THREE.VideoTexture;
export {};
