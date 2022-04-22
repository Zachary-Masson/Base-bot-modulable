const {Command, InteractionsOptions, InteractionError} = require('../../../libs/core');
const {CommandInteraction, MessageEmbed} = require('discord.js');

const command = new Command({
    name: "ban",
    description: "command for ban member",
    permission: "BAN_MEMBERS",
    options: [
        {
            type: 6,
            name: "member",
            description: "member you want to ban",
            required: true
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
    if (member.permissions.has(command.commandData.permission)) return InteractionError(interaction, 'The member cannot be banned !');
    member.ban();
    interaction.reply({
        embeds: [
            new MessageEmbed().setColor('#4163ff').setDescription(`**__${member.user.tag}__** was banned by **__${interaction.member.user.tag}__**`).addField('Reason', reason ? reason : "unspecified").setTimestamp()
        ]
    })
};

module.exports = command;