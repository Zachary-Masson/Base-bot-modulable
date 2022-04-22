import {ReplacesOptions} from "./ReplacesOptions";

export interface DebugOptions {
    type: "error" | "success" | "modules" | "actions" | "module" | "api" | "title",
    module?: string,
    replaces?: [ReplacesOptions] | any
}