const {Command, InteractionsOptions} = require('../../../libs/core');
const {CommandInteraction, MessageEmbed} = require('discord.js');

const command = new Command({
    name: "say",
    description: "send your message",
    permission: "MANAGE_MESSAGES", // or role ID
    options: [
        {
            type: 3,
            name: "message",
            description: "your message",
            required: true
        },
        {
            type: 3,
            name: "embed",
            description: "do you want the message to be in an embed ?",
            choices: [
                {
                    name: "yes",
                    value: "true"
                },
                {
                    name: "no",
                    value: "false"
                }
            ],
            required: true
        }
    ]
})

/**
 * @param {InteractionsOptions} options
 * @param {CommandInteraction} interaction
 */
command.execute = (options, interaction) => {
    const message = interaction.options.getString('message');
    const inEmbed = interaction.options.getString('embed');
    if (inEmbed === "true") {
        interaction.channel.send({
            embeds: [
                new MessageEmbed().setColor('#8dff71').setDescription(message)
            ]
        });
    } else {
        interaction.channel.send(message);
    }
    interaction.reply({
        content: 'message sent',
        ephemeral: true
    })
}

module.exports = command;