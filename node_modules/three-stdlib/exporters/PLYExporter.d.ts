import { Object3D } from 'three';
export interface PLYExporterOptions {
    binary?: boolean;
    excludeAttributes?: string[];
    littleEndian?: boolean;
}
declare class PLYExporter {
    parse(object: Object3D, onDone: ((res: string) => void) | undefined, options: PLYExporterOptions): string | ArrayBuffer | null;
    private traverseMeshes;
}
export { PLYExporter };
