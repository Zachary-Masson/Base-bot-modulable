import {Request, Response} from "express";
import {Error} from "./Error";

export const bodyController = (req: Request, res: Response, meta: [string]) => {
    let error: boolean = false;
    meta.map((mt: string) => {
        if (!req.body[mt]) {
            error = true;
            // @ts-ignore
            return Error(404, `Missing ${mt} in body`, res);
        }
    })
    return error;
}