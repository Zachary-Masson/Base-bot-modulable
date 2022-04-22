import {Database} from "../../../Database-dev/";
const {Client} = require('discord.js');

export interface EventsOptions {
    config: object,
    events: object,
    client: Client,
    databaseModel: Database
}