import {RequestOptions} from "../interfaces/RequestOptions";
import {RouterOptions} from "../interfaces/RouterOptions";
import {bodyController} from "./Body";
import {headerController} from "./Header";
import {Request, Response, Router} from "express";

export class Route {
    private readonly _baseUrl: string;
    private readonly _request: [{
        type: string,
        path: string,
        options: RequestOptions,
        execute: void
    }] | any;
    private readonly _routes: [Route] | any;
    private _router: Router | any;
    private _options: RouterOptions | object;

    constructor(baseUrl: string) {
        this._baseUrl = baseUrl;
        this._request = [];
        this._routes = [];
        this._options = {};
    }

    main(options: RouterOptions | object) {
        this._options = options;
        this._router = Router();
        this._request.map((request: { type: string | number; path: string; options: RouterOptions; execute: (options: object, req: object, res: object) => void }) => {
            this._router[request.type](request.path, (req: Request, res: Response) => {
                // @ts-ignore
                if (request.options['bodyController'] && request.options['bodyController'][0]) {
                    // @ts-ignore
                    if (bodyController(req, res, request.options['bodyController'])) return;
                }

                // @ts-ignore
                if (request.options['headerController'] && request.options['headerController'][0]) {
                    // @ts-ignore
                    if (headerController(req, res, request.options['headerController'])) return;
                }
                request.execute(this._options, req, res);
            })
        })
        if (this._routes[0]) {
            this._routes.map((route: Route) => {
                this._router.use(route.baseUrl, route.main(this._options))
            })
        }
        return this._router;
    }

    use(route: Route) {
        this._routes.push(route);
    }

    get(path: string ,options: RequestOptions, execute :(options: RouterOptions, req: Request, res: Response) => void) {
        this._request.push({
            type: 'get',
            path,
            options,
            execute
        })
        return this
    }

    post(path: string, options: RequestOptions, execute :(options: RouterOptions, req: Request, res: Response) => void) {
        // @ts-ignore
        this._request.push({
            type: 'post',
            path,
            options,
            execute
        })
        return this
    }

    put(path: string, options: RequestOptions, execute :(options: RouterOptions, req: Request, res: Response) => void) {
        // @ts-ignore
        this._request.push({
            type: 'put',
            path,
            options,
            execute
        })
        return this
    }

    delete(path: string, options: RequestOptions, execute :(options: RouterOptions, req: Request, res: Response) => void) {
        // @ts-ignore
        this._request.push({
            type: 'delete',
            path,
            options,
            execute
        })
        return this
    }

    // @ts-ignore
    get baseUrl() {
        return this._baseUrl;
    }

    // @ts-ignore
    get request() {
        return this._request;
    }
}