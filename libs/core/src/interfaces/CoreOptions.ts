import {ModulesManifestOptions} from "./ModulesManifestOptions";
import {Event} from "../utils/Event";
import {Command} from "../utils/Command";
import {Button} from "../utils/Button";
import {Route} from "../../../api";

export interface CoreOptions {
    Modules: [ModulesManifestOptions],
    Events: [Event],
    Commands: [Command],
    Buttons: [Button],
    Api: [Route]
}