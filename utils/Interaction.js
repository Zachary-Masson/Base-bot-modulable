const { Client, Permissions, MessageEmbed } = require('discord.js')

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
            if (interaction.isCommand()) return this.Commands(interaction);
            if (interaction.isButton()) return this.Buttons(interaction);
            if (interaction.isSelectMenu()) return this.SelectMenu(interaction);
        })
    }

    async Commands(interaction) {
        const {commandName} = interaction;
        const commandSearch = this._client.interaction.commands.filter(cmd => cmd.commandData.name === commandName)[0];
        if (!commandSearch) return this.sendError(interaction, "The commands is available !");
        const {commandData, execute} = commandSearch;
        if (commandData['permission']) {
            if (!isNaN(parseInt(commandData['permission']))) {
                if (interaction.guild.roles.resolve(commandData['permission']) === null) return this.sendError(interaction, 'An error has occurred, please contact support with the error code : "fx05233"');
                if (interaction.member.roles.resolve(commandData['permission']) === null) return this.sendError(interaction, "You don't have permissions !")
            }
            else {
                if (!interaction.member.permissions.has(commandData['permission'])) return this.sendError(interaction, "You don't have permissions !")
            }
        }
        execute({
            config: commandData['modulesParent'] ? this._modules.filter(data => data.tag === commandData.modulesParent)[0].config : {},
            events: this._events,
            client: this._client,
            databaseModel: this._databaseModel
        }, interaction);
    }

    Buttons(interaction) {
        const {customId} = interaction;
        const buttonID = customId.split('#')[0];
        const buttonSearch = this._client.interaction.buttons.filter(btn => btn.buttonData.custom_id === buttonID)[0];
        if (!buttonSearch) return this.sendError(interaction, "The button is available !");
        const {buttonData, execute} = buttonSearch;
        execute({
            config: buttonData['modulesParent'] ? this._modules.filter(data => data.tag === buttonData.modulesParent)[0].config : {},
            events: this._events,
            client: this._client,
            databaseModel: this._databaseModel
        }, interaction);
    }

    SelectMenu(interaction) {

    }

    sendError(interaction, message) {
        interaction.reply({
            embeds: [
                new MessageEmbed().setColor('#ff423c').setDescription(message)
            ],
            ephemeral: true
        })
    }
}

module.exports = Interaction;