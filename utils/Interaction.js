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
        const commandSearch = this._client.interaction.commands.filter(cmd => cmd.Data.name === commandName)[0];
        if (!commandSearch) return this.sendError(interaction, "The commands is available !");
        const {Data, Commands} = commandSearch;
        if (Data['permission']) {
            if (!isNaN(parseInt(Data['permission']))) {
                if (interaction.guild.roles.resolve(Data['permission']) === null) return this.sendError(interaction, 'An error has occurred, please contact support with the error code : "fx05233"');
                if (interaction.member.roles.resolve(Data['permission']) === null) return this.sendError(interaction, "You don't have permissions !")
            }
            else {
                if (!interaction.member.permissions.has(Data['permission'])) return this.sendError(interaction, "You don't have permissions !")
            }
        }
        Commands( Data['modulesParent'] ? this._modules.filter(data => data.tag === Data.modulesParent)[0].config : {}, this._events, this._client, interaction, this._databaseModel);
    }

    Buttons(interaction) {
        const {customId} = interaction;
        const buttonID = customId.split('#')[0];
        const buttonSearch = this._client.interaction.buttons.filter(btn => btn.Data.custom_id === buttonID)[0];
        if (!buttonSearch) return this.sendError(interaction, "The button is available !");
        const {Data, Button} = buttonSearch;
        Button( Data['modulesParent'] ? this._modules.filter(data => data.tag === Data.modulesParent)[0].config : {}, this._events, this._client, interaction, this._databaseModel);
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