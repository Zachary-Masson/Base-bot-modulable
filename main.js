const events = require('events');
const Client = require('./utils/Client');
const databaseModel = require('./libs/Database-dev');
const Events = new events();
const DataBaseModel = new databaseModel({
    root: `${__dirname}/database.json`
})
const client = new Client(Events, DataBaseModel)