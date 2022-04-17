const {Client, CommandInteraction, MessageEmbed} = require('discord.js');

const data = {
    name: "say",
    description: "send your message",
    permission: "MANAGE_MESSAGES", // or role ID
    options: [
        {
            type: 3,
            name: "message",
            description: "your message",
            required: true
        },
        {
            type: 3,
            name: "embed",
            description: "do you want the message to be in an embed ?",
            choices: [
                {
                    name: "yes",
                    value: "true"
                },
                {
                    name: "no",
                    value: "false"
                }
            ],
            required: true
        }
    ]
}

exports.Data = data;

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
        const inEmbed = this._interaction.options.getString('embed');
        if (inEmbed === "true") {
            this._interaction.channel.send({
                embeds: [
                    new MessageEmbed().setColor('#8dff71').setDescription(message)
                ]
            });
        } else {
            this._interaction.channel.send(message);
        }
        this._interaction.reply({
            content: 'message sent',
            ephemeral: true
        })
    }
}