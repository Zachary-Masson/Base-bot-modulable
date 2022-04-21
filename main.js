const events = require('events');
const Client = require('./utils/Client');
const {Database} = require('./libs/Database-dev');
const Events = new events();
const DataBaseModel = new Database({
    root: `${__dirname}/database.json`
});


const client = new Client(Events, DataBaseModel);