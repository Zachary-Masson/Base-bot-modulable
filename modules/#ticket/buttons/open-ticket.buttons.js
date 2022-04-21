const {Button, InteractionsOptions, InteractionError} = require('../../../libs/core')
const {ButtonInteraction, MessageEmbed, MessageActionRow} = require('discord.js');
const ButtonClose = require('./close-ticket.buttons');

const button = new Button({
    custom_id: "open-ticket",
    style: "SECONDARY",
    label: "Open a Ticket",
    emoji: "📩"
})

/**
 * @param {InteractionsOptions} options
 * @param {ButtonInteraction} interaction
 */
button.execute = async (options, interaction) => {
    const db = options.databaseModel.database;
    setupDatabase(options.databaseModel, db);
    if (db['#ticket']['tickets'][0] && db['#ticket']['tickets'].filter(ticket => ticket.userID === interaction.user.id).length >= options.config.ticket.maxTicketOpen) return InteractionError(interaction, `you already have ${options.config.ticket.maxTicketOpen} open tickets !`);
    const channel = await interaction.guild.channels.create(options.config.ticket.name.replaceAll('{{ user.username }}', interaction.user.username), {
        parent: options.config.ticket.parent,
        topic: options.config.ticket.topic.replaceAll('{{ user.id }}', interaction.user.id),
        permissionOverwrites: [
            {
                deny: "VIEW_CHANNEL",
                id: options.config.ticket.roles.member
            },
            {
                allow: "VIEW_CHANNEL",
                id: interaction.user.id
            },
            {
                allow: "VIEW_CHANNEL",
                id: options.config.ticket.roles.support
            }
        ]
    })

    db['#ticket']['tickets'].push({
        userID: interaction.user.id,
        channelID: channel.id
    })

    saveData(options.databaseModel, db);

    channel.send({
        embeds: [
            new MessageEmbed().setColor(options.config.colorEmbed).setDescription(options.config.ticket.firstMessage)
        ],
        components: [
            new MessageActionRow().addComponents(ButtonClose.button)
        ]
    })

    interaction.reply({
        embeds: [
            new MessageEmbed().setColor(options.config.colorEmbed).setDescription(`Your ticket is create ${channel}`)
        ],
        ephemeral: true
    })
}

const setupDatabase = (databaseModel, db) => {
    if (!db['#ticket']) db['#ticket'] = {};
    if (!db['#ticket']['tickets']) db['#ticket']['tickets'] = [];
    saveData(databaseModel, db);
}

const saveData = (databaseModel, db) => {
    databaseModel.database = db;
    databaseModel.save();
}

module.exports = button;
