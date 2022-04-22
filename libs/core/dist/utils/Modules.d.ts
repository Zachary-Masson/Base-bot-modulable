export declare const GetModules: () => Promise<void>;
export declare const ControllerModules: () => Promise<void>;
export declare const GetEvents: () => Promise<void>;
export declare const GetCommands: () => Promise<void>;
export declare const GetButtons: () => Promise<void>;
export declare const GetApi: () => Promise<void>;
export declare const ControllerEvents: () => Promise<void>;
export declare const ControllerCommands: () => Promise<void>;
export declare const ControllerButtons: () => Promise<void>;
export declare const getCore: () => {
    Modules: any[];
    Events: any[];
    Commands: any[];
    Buttons: any[];
    Api: any[];
};
