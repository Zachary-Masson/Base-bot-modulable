const {MessageEmbed} = require('discord.js');

export const InteractionError = (interaction:any, message:string) => {
    interaction.reply({
        embeds: [
            new MessageEmbed().setColor('#ff423c').setDescription(message),
        ],
        ephemeral: true
    })
}

export const ErrorConsole = (message: string) => {
    console.log(message)
}