const {Command, InteractionsOptions} = require('../../libs/core');
const {Client, CommandInteraction, MessageEmbed} = require('discord.js');
const codeError = require('../../config/code-error.config.json');

const command = new Command({
    name: "error",
    description: "error",
    permission: "ADMINISTRATOR",
    "options": [
        {
            type: 1,
            name: "list",
            description: "list of code error",
        },
        {
            type: 1,
            name: "search",
            description: "search one code error",
            options: [
                {
                    type: 3,
                    name: "code",
                    description: "code error",
                    required: true
                }
            ]
        }
    ]
})

/**
 * @param {InteractionsOptions} options
 * @param {CommandInteraction} interaction
 */
command.execute = (options, interaction) => {
    const subCommand = interaction.options.getSubcommand();
    if (subCommand === "list") {
        const embed = new MessageEmbed();
        const codeErrorList = Object.keys(codeError);
        codeErrorList.map(error => {
            embed.addField(error, codeError[error])
        })
        interaction.reply({
            embeds: [
                embed.setColor('#ff423c')
            ],
            ephemeral: true
        })
    }

    if (subCommand === "search") {
        const code = interaction.options.getString('code');
        if (!codeError[code]) return sendError(interaction,`(${code}) is not available !`);

        this._interaction.reply({
            embeds: [new MessageEmbed().setColor('#ff423c').addField(code, codeError[code])],
            ephemeral: true
        })
    }
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