const ModulesManifest = {
    name: "Moderation",
    tag: "#moderation",
    config: require('./config.json'),
    interaction: {
        commands: [
            require('./commands/say'),
            require('./commands/ban'),
            require('./commands/kick')
        ]
    }
}

module.exports = ModulesManifest