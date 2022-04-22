import { DatabaseOptions } from "../interfaces/DatabaseOptions";
export declare class Database {
    private _options;
    private _database;
    constructor(options: DatabaseOptions);
    private main;
    save(): void;
    set database(database: object);
    get database(): object;
}
