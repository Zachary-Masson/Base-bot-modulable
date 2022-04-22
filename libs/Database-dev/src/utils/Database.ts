import {DatabaseOptions} from "../interfaces/DatabaseOptions";
import {existsSync, readFileSync, writeFileSync} from "fs";
import saveRoot from "./SaveRoot";
import {verifyFile, getRoute} from "./RootData";
import error from './Error';

export class Database {
    private _options: DatabaseOptions;
    private _database: object | undefined;

    constructor(options: DatabaseOptions) {
        this._options = options;
        this.main();
    }

    private main() {
        if (this._options['root']) {
            if (existsSync(this._options['root'])) {
                saveRoot(this._options['root']);
            } else return error('the path of root does not exist !');
        } else {
            if (verifyFile() && existsSync(getRoute())) this._options['root'] = getRoute()
            else return error('root is available !')
        }

        // @ts-ignore
        this._database = JSON.parse(readFileSync(this._options.root, {encoding: "utf-8"}));
        if (this._options['autoSave'] && this._options['timeForAutoSave']) setInterval(() => {this.save()}, this._options.timeForAutoSave * 1000)
        return this;
    }

    save() {
        // @ts-ignore
        writeFileSync(this._options.root, JSON.stringify(this._database), {encoding: "utf-8"});
    }

    // @ts-ignore
    set database(database: object) {
        this._database = database;
    }
// @ts-ignore
    get database() {
        // @ts-ignore
        return this._database;
    }

}