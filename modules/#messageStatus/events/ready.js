const {Client} = require('discord.js');

class EventClass {
    /**
     * @private
     */
    _config;
    _events;
    /**
     * @type Client
     * @private
     */
    _client;

    /**k
     * @param {Object} config
     * @param {module:events.EventEmitter} events
     * @param {Client} client
     */
    constructor(config, events, client) {
        this._config = config;
        this._events = events;
        this._client = client;
        this.main();
    }

    main() {
        this._client.user.setActivity({
            name: this._config.message,
            type: "WATCHING"
        })
    }
}

const ready = (config, events, client) => new EventClass(config, events, client)

module.exports = ready;