const ModulesManifest = {
    name: "Moderation",
    tag: "#moderation",
    config: require('./config.json'),
    interactions: {
        commands: [
            require('./commands/ban'),
            require('./commands/kick'),
            require('./commands/say')
        ]
    }
}

module.exports = ModulesManifest