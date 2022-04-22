import { ButtonData } from "../interfaces/ButtonData";
export declare class Button {
    private _buttonData;
    private _execute;
    constructor(buttonData: ButtonData);
    set execute(func: void);
    get execute(): void;
    get buttonData(): ButtonData;
    get button(): any;
}
