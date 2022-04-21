const {Command, InteractionsOptions} = require('../../../libs/core');
const {CommandInteraction, MessageEmbed} = require('discord.js');

const command = new Command({
    name: "kick",
    description: "kick member",
    permission: "KICK_MEMBERS",
    options: [
        {
            type: 6,
            name: "member",
            description: "the member you want to kick",
            required: true,
        },
        {
            type: 3,
            name: "reason",
            description: "the reason of kick"
        }
    ]
})

/**
 * @param {InteractionsOptions} options
 * @param {CommandInteraction} interaction
 */
command.execute = (options, interaction) => {
    const member = interaction.options.getMember('member');
    const reason = interaction.options.getString('reason');
    if (member.permissions.has(command.commandData.permission)) return sendError(interaction,'The member cannot be kicked !');
    member.kick();
    interaction.reply({
        embeds: [
            new MessageEmbed().setColor('#4163ff').setDescription(`**__${member.user.tag}__** was kicked by **__${interaction.member.user.tag}__**`).addField('Reason', reason ? reason : "unspecified").setTimestamp()
        ]
    })
}

const sendError = (interaction, message) => {
    interaction.reply({
        embeds: [
            new MessageEmbed().setColor('#ff423c').setDescription(message),
        ],
        ephemeral: true
    })
}

module.exports = command;