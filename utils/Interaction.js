const {InteractionError} = require('../libs/core');
const { Client } = require('discord.js');

class Interaction {
    /**
     * @type {Client}
     * @private
     */
    _client;
    /**
     * @type {module:events.EventEmitter}
     * @private
     */
    _events;
    /**
     * @type {Array}
     * @private
     */
    _modules;
    _databaseModel;

    /**
     *
     * @param {Client} client
     * @param {module:events.EventEmitter} events
     * @param modules
     * @param databaseModel
     */
    constructor(client, events, modules, databaseModel) {
        this._client = client;
        this._events = events;
        this._modules = modules;
        this._databaseModel = databaseModel;
        this.main();
    }

    main() {
        this._client.on('interactionCreate', (interaction) => {
            if (interaction.isCommand()) return this.Command(interaction);
            if (interaction.isButton()) return this.Button(interaction);
            if (interaction.isSelectMenu()) return this.SelectMenu(interaction);
        })
    }

    Command(interaction) {
        const {commandName} = interaction;
        const commandSearch = this._client.interactions.commands.filter(cmd => cmd.commandData.name === commandName)[0];
        if (!commandSearch) return InteractionError(interaction, "The commands is available !");
        const {commandData, execute} = commandSearch;
        if (commandData['permission']) {
            if (!isNaN(parseInt(commandData['permission']))) {
                if (interaction.guild.roles.resolve(commandData['permission']) === null) return InteractionError(interaction, 'An error has occurred, please contact support with the error code : "fx05233"');
                if (interaction.member.roles.resolve(commandData['permission']) === null) return InteractionError(interaction, "You don't have permissions !")
            }
            else {
                if (!interaction.member.permissions.has(commandData['permission'])) return InteractionError(interaction, "You don't have permissions !")
            }
        }
        execute({
            config: this._modules.filter(data => data.tag === commandSearch.modulesParent)[0].config,
            events: this._events,
            client: this._client,
            databaseModel: this._databaseModel
        }, interaction);
    }

    Button(interaction) {
        const {customId} = interaction;
        const buttonID = customId.split('#')[0];
        const buttonSearch = this._client.interactions.buttons.filter(btn => btn.buttonData.custom_id === buttonID)[0];
        if (!buttonSearch) return InteractionError(interaction, "The button is available !");
        const {buttonData, execute} = buttonSearch;
        execute({
            config: this._modules.filter(data => data.tag === buttonSearch.modulesParent)[0].config,
            events: this._events,
            client: this._client,
            databaseModel: this._databaseModel
        }, interaction);
    }

    SelectMenu(interaction) {

    }

}

module.exports = Interaction;