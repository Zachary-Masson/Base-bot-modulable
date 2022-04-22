import { CommandData } from "../interfaces/CommandData";
export declare class Command {
    private readonly _commandData;
    private _execute;
    constructor(commandData: CommandData | object);
    set execute(func: void);
    setExecute(func: any): this;
    get execute(): void;
    get commandData(): object | CommandData;
}
