const ModulesManifest = {
    name: "Ticket",
    tag: "#ticket",
    config: require('./config.json'),
    interactions: {
        commands: [
            require('./commands/setup.commands')
        ],
        buttons: [
            require('./buttons/open-ticket.buttons'),
            require('./buttons/close-ticket.buttons')
        ]
    }
}

module.exports = ModulesManifest;