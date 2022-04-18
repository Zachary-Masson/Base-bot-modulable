const {Client, CommandInteraction, MessageEmbed, MessageActionRow} = require('discord.js');
const {getButton} = require('../buttons/open-ticket.buttons');

const data = {
    name: "setup",
    description: "setup message for system ticket",
    permission: "MANAGE_MESSAGES", // or role ID
    options: [
        {
            type: 3,
            name: "message",
            description: "your message",
            required: true
        },
    ]
}

exports.Data = data;

exports.Commands = (config, events, client, interaction, databaseModel) => new Commands(config, events, client, interaction, databaseModel);

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
    _databaseModel;
    /**
     * @param {Object} config
     * @param {module:events.EventEmitter} events
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {Object} databaseModel
     */
    constructor(config, events, client, interaction, databaseModel) {
        this._config = config;
        this._events = events;
        this._client = client;
        this._interaction = interaction;
        this._databaseModel = databaseModel;
        this.main();
    }

    main() {
        const message = this._interaction.options.getString('message');
        this._interaction.reply({
            embeds: [
                new MessageEmbed().setColor(this._config.colorEmbed).setDescription(message)
            ],
            components: [
                new MessageActionRow().addComponents(getButton)
            ]
        })
    }
}