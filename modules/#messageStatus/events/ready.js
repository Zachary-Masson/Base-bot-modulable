const {EventsReadyOptions, Event} = require("../../../libs/core");
const {Client} = require('discord.js');
const event = new Event('ready');

/**
 * @param {EventsReadyOptions} options
 * @param {Client} client
 */
event.execute = (options, client) => {
    client.user.setActivity(options.config)
}

module.exports = event;