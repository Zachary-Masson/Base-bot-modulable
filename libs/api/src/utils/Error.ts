import {Response} from 'express';

export const Error = (code: number, message: string, response: Response) => {
    response.status(code).json({
        error: true,
        message
    })
}