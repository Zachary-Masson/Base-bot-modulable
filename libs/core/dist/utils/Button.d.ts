import { ButtonData } from "../interfaces/ButtonData";
export declare class Button {
    private _buttonData;
    private _execute;
    constructor(buttonData: ButtonData);
    set execute(func: void);
    setExecute(func: any): this;
    get execute(): void;
    get buttonData(): ButtonData;
    get button(): any;
}
