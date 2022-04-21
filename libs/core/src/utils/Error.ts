const {MessageEmbed} = require('discord.js');

export const InteractionError = (interaction, message) => {
    interaction.reply({
        embeds: [
            new MessageEmbed().setColor('#ff423c').setDescription(message),
        ],
        ephemeral: true
    })
}