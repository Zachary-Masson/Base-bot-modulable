import { RequestOptions } from "../interfaces/RequestOptions";
import { RouterOptions } from "../interfaces/RouterOptions";
import { Request, Response } from "express";
export declare class Route {
    private readonly _baseUrl;
    private readonly _request;
    private readonly _routes;
    private _router;
    private _options;
    constructor(baseUrl: string);
    main(options: RouterOptions | object): any;
    use(route: Route): void;
    get(path: string, options: RequestOptions, execute: (options: RouterOptions, req: Request, res: Response) => void): this;
    post(path: string, options: RequestOptions, execute: (options: RouterOptions, req: Request, res: Response) => void): this;
    put(path: string, options: RequestOptions, execute: (options: RouterOptions, req: Request, res: Response) => void): this;
    delete(path: string, options: RequestOptions, execute: (options: RouterOptions, req: Request, res: Response) => void): this;
    get baseUrl(): string;
    get request(): any;
}
