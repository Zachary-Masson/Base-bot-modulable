import {ReturnColor} from "./Utils";
import {sendDebug} from "./SendDebug";
import {SetColor} from "./SetColor";

export const DebugSuccess = (message: string) => {
    const title: string = "     [$→SUCCESS$]";
    sendDebug(SetColor(`${title} ${message}`, ReturnColor('success')));
}

export const DebugActions = (message: string) => {
    const title: string = "     [$→ACTIONS$]";
    sendDebug(SetColor(`${title} ${message}`, ReturnColor('actions')));
}

export const DebugModules = (message: string, moduleName: string) => {
    const title: string = `     [$→MODULES$] ($→${moduleName}$)`;
    sendDebug(SetColor(`${title} ${message}`, ReturnColor('modules')));
}

export const DebugModule = (message: string, moduleName: string) => {
    const title: string = `     [$→MODULE$] ($→${moduleName}$)`;
    sendDebug(SetColor(`${title} ${message}`, ReturnColor('module')));
}

export const DebugApi = (message: string) => {
    const title: string = `     [$→API$]`;
    sendDebug(SetColor(`${title} ${message}`, ReturnColor('api')));
}

export const DebugTitle = (title: string) => {
    sendDebug(SetColor(`\n   $→${title} →$`, ReturnColor('title')));
}