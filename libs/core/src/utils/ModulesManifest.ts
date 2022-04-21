import {ModulesManifestOptions} from "../interfaces/ModulesManifestOptions";

export class ModulesManifest {
    _manifest: ModulesManifestOptions | object;

    constructor(manifest: ModulesManifestOptions | object) {
        this._manifest = manifest;
    }

    // @ts-ignore
    get manifest() {
        return this._manifest;
    }
}