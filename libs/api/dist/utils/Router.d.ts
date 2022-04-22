import { RouterOptions } from "../interfaces/RouterOptions";
import { Route } from "./Route";
export declare class Router {
    private readonly _options;
    private readonly _moduleName;
    private readonly _route;
    private _router;
    constructor(options: RouterOptions | undefined, moduleName: string, route: Route | any);
    main(): any;
    get options(): RouterOptions | undefined;
    get moduleName(): string;
    get route(): any;
}
