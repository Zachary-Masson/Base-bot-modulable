import {ModulesManifestOptions} from "./ModulesManifestOptions";
import {CommandData} from "./CommandData";
import {ButtonData} from "./ButtonData";

export interface CoreOptions {
    Modules: [
        ModulesManifestOptions
    ],
    Events: [
        {
            eventType: string,
            execute: void
        }
    ],
    Commands: [
        {
            commandData: CommandData,
            execute: void
        }
    ],
    Buttons: [
        {
            buttonData: ButtonData,
            execute: void
        }
    ]
}