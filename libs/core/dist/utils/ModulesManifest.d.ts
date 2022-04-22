import { ModulesManifestOptions } from "../interfaces/ModulesManifestOptions";
export declare class ModulesManifest {
    _manifest: ModulesManifestOptions | object;
    constructor(manifest: ModulesManifestOptions | object);
    get manifest(): object | ModulesManifestOptions;
}
