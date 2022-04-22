import { Event } from "../utils/Event";
import { Command } from "../utils/Command";
import { Button } from "../utils/Button";
import { Route } from "../../../api";
export interface ModulesManifestOptions {
    name: string;
    tag: string;
    config?: object;
    useDatabase?: boolean;
    events?: [Event];
    interactions?: {
        commands?: [Command];
        buttons?: [Button];
    };
    packages?: [string];
    api?: Route;
}
