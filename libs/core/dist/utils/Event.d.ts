export declare class Event {
    private _eventType;
    private _execute;
    constructor(eventType: string);
    set execute(func: void);
    get execute(): void;
    get eventType(): string;
}
