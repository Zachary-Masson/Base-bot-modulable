import {RouterOptions} from "../interfaces/RouterOptions";
import {Route} from "./Route";
import express from "express";

export class Router {
    private readonly _options: RouterOptions | undefined;
    private readonly _moduleName: string;
    private readonly _route: Route | any;
    private _router: Router | any;

    constructor(options: RouterOptions | undefined, moduleName: string, route: Route | any) {
        this._options = options;
        this._moduleName = moduleName;
        this._route = route;
    }

    main() {
        this._router = express.Router();
        this._router.use(this._route.baseUrl, this._route.main(this._options));
        this._router.get('/try', (req: express.Request, res: express.Response) => {
            req;
            res.send('success')
        })
        return this._router;
    }

    // @ts-ignore
    get options () {
        return this._options;
    }

    // @ts-ignore
    get moduleName () {
        return this._moduleName;
    }

    // @ts-ignore
    get route () {
        return this._route;
    }
}