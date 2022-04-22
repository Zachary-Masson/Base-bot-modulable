import {DebugOptions} from "../interfaces/DebugOptions";
import {VerifyTypeExist} from "./Utils";
import {sendError} from "./Error";
import {ReplacesOptions} from "../interfaces/ReplacesOptions";
import {DebugApi, DebugModules, DebugSuccess, DebugTitle, DebugModule, DebugActions} from "./Types";

export const debug = (options: DebugOptions, message: string) => {
    let Message: string = message;
    if (!VerifyTypeExist(options.type)) return sendError(`($→${options.type}$) does exits !`);
    if (options["replaces"] && options["replaces"][0]) {
        options["replaces"].map((meta: ReplacesOptions) => {
            Message = Message.replace(meta.String, meta.data === "moduleName" ? (options['module'] ? options['module'] : "undefined") : meta.data)
        })
    }

    if (options.type === "error") return sendError(Message);
    if (options.type === "success") return DebugSuccess(Message);
    if (options.type === "actions") return DebugActions(Message);
    if (options.type === "api") return DebugApi(Message);
    if (options.type === "title") return DebugTitle(Message);
    if (options.type === "modules") return DebugModules(Message, options['module'] ? options['module'] : 'undefined');
    if (options.type === "module") return DebugModule(Message, options['module'] ? options['module'] : 'undefined');
}