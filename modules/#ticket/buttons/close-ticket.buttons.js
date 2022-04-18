const {Client, Interaction, MessageButton, MessageEmbed} = require('discord.js');
const databaseModel = require('../../../libs/Database-dev');

const data = {
    custom_id: "close-ticket",
    style: "DANGER",
    label: "Close a Ticket",
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
        db['#ticket']['tickets'] = db['#ticket']['tickets'].filter(ticket => ticket.channelID !== this._interaction.channel.id);
        this.saveData(db);
        this._interaction.reply({
            embeds: [
                new MessageEmbed().setColor(this._config.colorEmbed).setDescription(`Your ticket will be deleted in ${this._config.ticket.timeBeforeDeletion}s !`)
            ],
        })
        setTimeout(() => this._interaction.channel.delete(), this._config.ticket.timeBeforeDeletion * 1000)
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