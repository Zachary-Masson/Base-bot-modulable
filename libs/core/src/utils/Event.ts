export class Event {
    private _eventType: string;
    private _execute: void;

    constructor(eventType: string) {
        this._eventType = eventType;
    }

    // @ts-ignore
    public set execute(func) {
        this._execute = func;
    }

    // @ts-ignore
    public setExecute(func) {
        this._execute = func;
        // @ts-ignore
        return this;
    }

    // @ts-ignore
    public get execute() {
        return this._execute;
    }

    // @ts-ignore
    public get eventType() {
        return this._eventType;
    }
}