import {Database} from "../../../Database-dev";

export interface RouterOptions {
    config: object,
    events: object,
    client: Client,
    databaseModel: Database
}