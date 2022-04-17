const {Client, CommandInteraction, MessageEmbed} = require('discord.js');

const data = {
    name: "ban",
    description: "ban member",
    permission: "BAN_MEMBERS",
    options: [
        {
            type: 6,
            name: "member",
            description: "the member you want to ban",
            required: true,
        },
        {
            type: 3,
            name: "reason",
            description: "the reason of ban"
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
        const member = this._interaction.options.getMember('member');
        const reason = this._interaction.options.getString('reason');
        if (member.permissions.has(data.permission)) return this.sendError('The member cannot be banned !');
        member.ban();
        this._interaction.reply({
            embeds: [
                new MessageEmbed().setColor('#4163ff').setDescription(`**__${member.user.tag}__** was banned by **__${this._interaction.member.user.tag}__**`).addField('Reason', reason ? reason : "unspecified").setTimestamp()
            ]
        })
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