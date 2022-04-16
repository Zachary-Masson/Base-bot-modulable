const ModulesManifest = {
    name: "Moderation",
    tag: "#moderation",
    config: require('./config.json'),
    interaction: {
        commands: [
            require('./commands/say')
        ]
    }
}

module.exports = ModulesManifest