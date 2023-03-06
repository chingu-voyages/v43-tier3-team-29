import { Scene, Object3D, AnimationClip, Material, Texture, Camera, KeyframeTrack, Light, Vector2Tuple, Vector3Tuple } from 'three';
export interface GLTFExporterOptions {
    binary?: boolean;
    trs?: boolean;
    onlyVisible?: boolean;
    truncateDrawRange?: boolean;
    embedImages?: boolean;
    animations?: AnimationClip[];
    forceIndices?: boolean;
    forcePowerOfTwoTextures?: boolean;
    includeCustomExtensions?: boolean;
}
declare type PluginCallback = (writer: GLTFWriter) => GLTFLightExtension | GLTFMaterialsUnlitExtension | GLTFMaterialsPBRSpecularGlossiness | GLTFMaterialsTransmissionExtension | GLTFMaterialsVolumeExtension;
declare type TransformDef = {
    offset?: Vector2Tuple;
    rotation?: number;
    scale?: Vector2Tuple;
};
declare type BufferViewDef = {
    buffer: number;
    byteOffset: number;
    byteLength: number;
    target?: number;
    byteStride?: number;
};
declare type AccessorDef = {
    bufferView: unknown;
    byteOffset: unknown;
    componentType: unknown;
    count: unknown;
    max: unknown;
    min: unknown;
    type: unknown;
    normalized?: boolean;
};
declare type ImageDef = {
    mimeType: string;
    bufferView?: number;
    uri?: string;
};
declare type ImageRepresentation = HTMLImageElement | HTMLCanvasElement | OffscreenCanvas | ImageBitmap;
declare type SamplerDef = {
    magFilter: typeof WEBGL_CONSTANTS[keyof typeof WEBGL_CONSTANTS];
    minFilter: typeof WEBGL_CONSTANTS[keyof typeof WEBGL_CONSTANTS];
    wrapS: typeof WEBGL_CONSTANTS[keyof typeof WEBGL_CONSTANTS];
    wrapT: typeof WEBGL_CONSTANTS[keyof typeof WEBGL_CONSTANTS];
};
declare type TextureDef = {
    sampler: number;
    source: number;
    name?: string;
};
declare type MaterialDef = {
    pbrMetallicRoughness: {
        baseColorFactor?: number[];
        metallicFactor?: number;
        roughnessFactor?: number;
        metallicRoughnessTexture?: {
            index: number;
        };
        baseColorTexture?: {
            index: number;
        };
    };
    emissiveFactor?: number[];
    emissiveTexture?: {
        index: number;
    };
    normalTexture?: {
        index: number;
        scale?: number | undefined;
    };
    occlusionTexture?: OcclusionMapDef;
    alphaMode?: string;
    alphaCutoff?: number;
    doubleSided?: boolean;
    name?: string;
    extensions?: {
        [key: string]: unknown;
    };
};
declare type OcclusionMapDef = {
    index: number;
    texCoord: number;
    strength?: number;
};
declare type CameraDef = {
    type: string;
    orthographic?: {
        xmag: number;
        ymag: number;
        zfar: number;
        znear: number;
    };
    perspective?: {
        aspectRatio: number;
        yfov: number;
        zfar: number;
        znear: number;
    };
    name?: string;
};
declare type NodeDef = {
    rotation?: number[];
    translation?: Vector3Tuple;
    scale?: Vector3Tuple;
    matrix?: number[];
    name?: string;
    mesh?: number;
    camera?: number;
    children?: number[];
    extensions?: {
        [key: string]: number | {
            light?: number;
        };
    };
};
declare type SceneDef = {
    name?: string;
    nodes?: number[];
};
declare class GLTFExporter {
    private pluginCallbacks;
    constructor();
    private register;
    unregister(callback: PluginCallback): this;
    parse(input: Object3D, onDone: (gltf: object) => void, options: GLTFExporterOptions): void;
    static Utils: {
        insertKeyframe: (track: KeyframeTrack, time: number) => number | undefined;
        mergeMorphTargetTracks: (clip: AnimationClip, root: any) => AnimationClip;
    };
}
declare const WEBGL_CONSTANTS: {
    readonly POINTS: 0;
    readonly LINES: 1;
    readonly LINE_LOOP: 2;
    readonly LINE_STRIP: 3;
    readonly TRIANGLES: 4;
    readonly TRIANGLE_STRIP: 5;
    readonly TRIANGLE_FAN: 6;
    readonly UNSIGNED_BYTE: 5121;
    readonly UNSIGNED_SHORT: 5123;
    readonly FLOAT: 5126;
    readonly UNSIGNED_INT: 5125;
    readonly ARRAY_BUFFER: 34962;
    readonly ELEMENT_ARRAY_BUFFER: 34963;
    readonly NEAREST: 9728;
    readonly LINEAR: 9729;
    readonly NEAREST_MIPMAP_NEAREST: 9984;
    readonly LINEAR_MIPMAP_NEAREST: 9985;
    readonly NEAREST_MIPMAP_LINEAR: 9986;
    readonly LINEAR_MIPMAP_LINEAR: 9987;
    readonly CLAMP_TO_EDGE: 33071;
    readonly MIRRORED_REPEAT: 33648;
    readonly REPEAT: 10497;
};
declare class GLTFWriter {
    private plugins;
    private options;
    private pending;
    private buffers;
    private byteOffset;
    private nodeMap;
    private skins;
    extensionsUsed: {
        [key: string]: boolean;
    };
    private uids;
    private uid;
    json: {
        asset: {
            version: string;
            generator: string;
        };
        buffers?: {
            uri?: ArrayBuffer | string;
            byteLength: number;
        }[];
        extensionsUsed?: string[];
        bufferViews?: BufferViewDef[];
        images?: ImageRepresentation[] & ImageDef[];
        accessors?: AccessorDef[];
        samplers?: SamplerDef[];
        textures?: Texture[] & TextureDef[];
        materials?: Material[] & MaterialDef[];
        meshes?: unknown[];
        cameras?: (Camera | CameraDef)[];
        animations?: unknown[];
        nodes?: {
            [key: string]: unknown;
        }[];
        skins?: {}[];
        scenes?: (Scene | SceneDef)[];
        scene?: number;
        extensions?: {
            [key: string]: {
                lights: unknown[];
            };
        };
    };
    private cache;
    private cachedCanvas;
    constructor();
    setPlugins(plugins: ReturnType<PluginCallback>[]): void;
    write(input: Object3D, onDone: (gltf: object) => void, options: GLTFExporterOptions): void;
    private serializeUserData;
    private getUID;
    private isNormalizedNormalAttribute;
    private createNormalizedNormalAttribute;
    applyTextureTransform(mapDef: {
        extensions?: {
            [key: string]: TransformDef;
        };
        index?: number;
    }, texture: Texture): void;
    processBuffer(buffer: ArrayBuffer): number;
    private processBufferView;
    processBufferViewImage(blob: Blob): Promise<number>;
    private processAccessor;
    private processImage;
    private processSampler;
    processTexture(map: Texture): number;
    private processMaterial;
    private processMesh;
    private processCamera;
    private processAnimation;
    private processSkin;
    private processNode;
    private processScene;
    private processObjects;
    private processInput;
    private _invokeAll;
    private equalArray;
    private stringToArrayBuffer;
    private isIdentityMatrix;
    private getMinMax;
    private getPaddedBufferSize;
    private getPaddedArrayBuffer;
}
declare class GLTFLightExtension {
    private writer;
    private name;
    constructor(writer: GLTFWriter);
    writeNode(light: Light, nodeDef: NodeDef): void;
}
declare class GLTFMaterialsUnlitExtension {
    private writer;
    private name;
    constructor(writer: GLTFWriter);
    writeMaterial(material: Material, materialDef: MaterialDef): void;
}
declare class GLTFMaterialsPBRSpecularGlossiness {
    private writer;
    private name;
    constructor(writer: GLTFWriter);
    writeMaterial(material: Material, materialDef: MaterialDef): void;
}
declare class GLTFMaterialsTransmissionExtension {
    private writer;
    private name;
    constructor(writer: GLTFWriter);
    writeMaterial(material: Material, materialDef: MaterialDef): void;
}
declare class GLTFMaterialsVolumeExtension {
    private writer;
    private name;
    constructor(writer: GLTFWriter);
    writeMaterial(material: Material, materialDef: MaterialDef): void;
}
export { GLTFExporter };
