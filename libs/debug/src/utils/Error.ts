import {sendDebug} from "./SendDebug";
import {SetColor} from "./SetColor";

export const sendError = (message: string) => {
    const title: string = "     [$→ERROR$]"
    sendDebug(SetColor(`${title} ${message}`, 124));
}