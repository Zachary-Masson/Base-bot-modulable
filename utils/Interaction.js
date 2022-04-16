const { Client } = require('discord.js')

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

    Commands(interaction) {
        const {commandName} = interaction;
        const {Data, Commands} = this._client.interaction.commands.filter(cmd => cmd.Data.name === commandName)[0];
        if (!Commands) interaction.reply({
            content: 'The commands is available'
        })
        Commands(this._modules.filter(data => data.tag === Data.modulesParent)[0].config, this._events, this._client, interaction);
    }

    Buttons(interaction) {

    }

    SelectMenu(interaction) {

    }
}

module.exports = Interaction;