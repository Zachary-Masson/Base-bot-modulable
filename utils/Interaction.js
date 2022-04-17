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
    _modules

    /**
     *
     * @param {Client} client
     * @param {module:events.EventEmitter} events
     * @param modules
     */
    constructor(client, events, modules) {
        this._client = client;
        this._events = events;
        this._modules = modules;
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
        const {Data, Commands} = this._client.interaction.commands.filter(cmd => cmd.Data.name === commandName)[0];
        if (!Commands) return this.sendError(interaction, "The commands is available !");
        if (Data['permission']) {
            if (!isNaN(parseInt(Data['permission']))) {
                if (interaction.guild.roles.resolve(Data['permission']) === null) return this.sendError(interaction, 'An error has occurred, please contact support with the error code : "fx05233"');
                if (interaction.member.roles.resolve(Data['permission']) === null) return this.sendError(interaction, "You don't have permissions !")
            }
            else {
                if (!interaction.member.permissions.has(Data['permission'])) return this.sendError(interaction, "You don't have permissions !")
            }
        }
        Commands( Data['modulesParent'] ? this._modules.filter(data => data.tag === Data.modulesParent)[0].config : {}, this._events, this._client, interaction);
    }

    Buttons(interaction) {

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