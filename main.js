const events = require('events');
const Client = require('./utils/Client');
const Events = new events();

const client = new Client(Events)