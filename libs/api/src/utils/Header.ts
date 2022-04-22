import {Request, Response} from "express";
import {Error} from "./Error";

export const headerController = (req: Request, res: Response, meta: [string]) => {
    let error: boolean = false;
    meta.map((mt: string) => {
        if (!req.headers[mt]) {
            error = true;
            // @ts-ignore
            return Error(404, `Missing ${mt} in header`, res);
        }
    })
    return error;
}