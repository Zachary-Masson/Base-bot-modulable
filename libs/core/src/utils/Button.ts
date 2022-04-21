import {ButtonData} from "../interfaces/ButtonData"
const {MessageButton} = require('discord.js');

export class Button {
    private _buttonData: ButtonData;
    private _execute: void;

    constructor(buttonData: ButtonData) {
        this._buttonData = buttonData;
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
    public get buttonData() {
        return this._buttonData;
    }

    // @ts-ignore
    public get button(){
        return new MessageButton().setCustomId(this._buttonData.custom_id).setStyle(this._buttonData.style).setLabel(this._buttonData.label).setEmoji(this._buttonData.emoji);
    }
}