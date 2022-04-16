const {Client, CommandInteraction} = require('discord.js');

exports.Data = {
    name: "say",
    description: "envoie de message par le bot",
    options: [
        {
            type: 3,
            name: "message",
            description: "votre message",
            required: true
        }
    ]
}

exports.Commands = (config, events, client, interaction) => new Commands(config, events, client, interaction);

class Commands {
    _config;
    /**
     * @type {module:events.EventEmitter}
     * @private
     */
    _events;
    /**
     * @type {Client}
     * @private
     */
    _client;
    /**
     * @type {CommandInteraction}
     * @private
     */
    _interaction;

    /**
     * @param {Object} config
     * @param {module:events.EventEmitter} events
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    constructor(config, events, client, interaction) {
        this._config = config;
        this._events = events;
        this._client = client;
        this._interaction = interaction;
        this.main();
    }

    main() {
        const message = this._interaction.options.getString('message');
        this._interaction.channel.send(message);
        this._interaction.reply({
            content: 'Message envoyer',
            ephemeral: true
        })
    }

}