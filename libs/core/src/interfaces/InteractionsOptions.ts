const {Client} = require('discord.js');

export interface InteractionsOptions {
    config: object,
    events: object,
    client: Client,
    databaseModel: object
}