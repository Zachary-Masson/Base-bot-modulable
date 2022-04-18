const {Client, Interaction, MessageButton, MessageEmbed, MessageActionRow} = require('discord.js');
const databaseModel = require('../../../libs/Database-dev');
const buttonClose = require('./close-ticket.buttons');

const data = {
    custom_id: "open-ticket",
    style: "SECONDARY",
    label: "Open a Ticket",
    emoji: "📩"
}

const getButton = new MessageButton().setCustomId(data.custom_id).setStyle(data.style).setLabel(data.label).setEmoji(data.emoji);

class Button {
    /**
     * @type {Object}
     * @private
     */
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
     * @type {Interaction}
     * @private
     */
    _interaction;
    /**
     * @type {databaseModel}
     * @private
     */
    _databaseModel;

    /**
     * @param {Object} config
     * @param {module:events.EventEmitter} events
     * @param {Client} client
     * @param {Interaction} interaction
     * @param {databaseModel} databaseModel
     */
    constructor(config, events, client, interaction, databaseModel) {
        this._config = config;
        this._events = events;
        this._client = client;
        this._interaction = interaction;
        this._databaseModel = databaseModel;
        this.main();
    }

    async main() {
        const db = this._databaseModel.database;
        this.setupDatabase(db);
        if (db['#ticket']['tickets'][0] && db['#ticket']['tickets'].filter(ticket => ticket.userID === this._interaction.user.id).length >= this._config.ticket.maxTicketOpen) return this.sendError(`you already have ${this._config.ticket.maxTicketOpen} open tickets !`);
        const channel = await this._interaction.guild.channels.create(this._config.ticket.name.replaceAll('{{ user.username }}', this._interaction.user.username), {
            parent: this._config.ticket.parent,
            topic: this._config.ticket.topic.replaceAll('{{ user.id }}', this._interaction.user.id),
            permissionOverwrites: [
                {
                    deny: "VIEW_CHANNEL",
                    id: this._config.ticket.roles.member
                },
                {
                    allow: "VIEW_CHANNEL",
                    id: this._interaction.user.id
                },
                {
                    allow: "VIEW_CHANNEL",
                    id: this._config.ticket.roles.support
                }
            ]
        })

        db['#ticket']['tickets'].push({
            userID: this._interaction.user.id,
            channelID: channel.id
        })

        this.saveData(db);

        channel.send({
            embeds: [
                new MessageEmbed().setColor(this._config.colorEmbed).setDescription(this._config.ticket.firstMessage)
            ],
            components: [
                new MessageActionRow().addComponents(buttonClose.getButton)
            ]
        })

        this._interaction.reply({
            embeds: [
                new MessageEmbed().setColor(this._config.colorEmbed).setDescription(`Your ticket is create ${channel}`)
            ],
            ephemeral: true
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

    setupDatabase(db) {
        if (!db['#ticket']) db['#ticket'] = {};
        if (!db['#ticket']['tickets']) db['#ticket']['tickets'] = [];
        this.saveData(db);
    }

    saveData(db) {
        this._databaseModel.database = db;
        this._databaseModel.save();
    }
}

exports.Data = data;
exports.getButton = getButton;
exports.Button = (config, events, client, interaction, databaseModel) => new Button(config, events, client, interaction, databaseModel);