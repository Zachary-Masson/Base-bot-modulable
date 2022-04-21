const {Command, InteractionsOptions} = require('../../../libs/core');
const {CommandInteraction, MessageEmbed, MessageActionRow} = require('discord.js');
const {button} = require('../buttons/open-ticket.buttons');

const command = new Command({
    name: "setup",
    description: "setup message for system ticket",
    permission: "MANAGE_MESSAGES", // or role ID
    options: [
        {
            type: 3,
            name: "message",
            description: "your message",
            required: true
        },
    ]
})

/**
 * @param {InteractionsOptions} options
 * @param {CommandInteraction} interaction
 */
command.execute = (options, interaction) => {
    const message = interaction.options.getString('message');
    interaction.reply({
        embeds: [
            new MessageEmbed().setColor(options.config.colorEmbed).setDescription(message)
        ],
        components: [
            new MessageActionRow().addComponents(button)
        ]
    })
}

module.exports = command;