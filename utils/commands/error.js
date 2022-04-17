const {Client, CommandInteraction, MessageEmbed} = require('discord.js');

const codeError = require('../../config/code-error.config.json');

const data = {
    name: "error",
    description: "error",
    permission: "ADMINISTRATOR",
    "options": [
        {
            type: 1,
            name: "list",
            description: "list of code error",
        },
        {
            type: 1,
            name: "search",
            description: "search one code error",
            options: [
                {
                    type: 3,
                    name: "code",
                    description: "code error",
                    required: true
                }
            ]
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
        const subCommand = this._interaction.options.getSubcommand();
        if (subCommand === "list") {
            const embed = new MessageEmbed();
            const codeErrorList = Object.keys(codeError);
            codeErrorList.map(error => {
                embed.addField(error, codeError[error])
            })
            this._interaction.reply({
                embeds: [
                    embed.setColor('#ff423c')
                ],
                ephemeral: true
            })
        }

        if (subCommand === "search") {
            const code = this._interaction.options.getString('code');
            if (!codeError[code]) return this.sendError(`(${code}) is not available !`);

            this._interaction.reply({
                embeds: [new MessageEmbed().setColor('#ff423c').addField(code, codeError[code])],
                ephemeral: true
            })
        }
    }

    sendError(message) {
        this._interaction.reply({
            embeds: [
                new MessageEmbed().setColor('#ff423c').setDescription(message),
            ],
            ephemeral: true
        })
    }

}