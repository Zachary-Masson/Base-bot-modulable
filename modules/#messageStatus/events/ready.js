const {EventsReadyOptions} = require("../../../libs/core");
const {Client} = require('discord.js');

class EventClass {
    /**
     * @type {EventsReadyOptions}
     * @private
     */
    _options;
    /**
     * @type {Client}
     * @private
     */
    _client;

    /**
     * @param {EventsReadyOptions} options
     * @param {Client} client
     */
    constructor(options, client) {
        this._options = options;
        this._client = client;
        this.main();
    }

    main() {
        this._client.user.setActivity(this._options.config)
    }
}

module.exports = (options, client) => new EventClass(options, client);