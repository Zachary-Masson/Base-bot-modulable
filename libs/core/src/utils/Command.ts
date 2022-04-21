import {CommandData} from "../interfaces/CommandData";

export class Command {
    private readonly _commandData: CommandData | object;
    private _execute: void;

    constructor(commandData: CommandData | object) {
        this._commandData = commandData;
    }

    // @ts-ignore
    public set execute(func) {
        this._execute = func;
    }

    // @ts-ignore
    public get execute() {
        return this._execute;
    }

    // @ts-ignore
    public get commandData() {
        return this._commandData;
    }
}