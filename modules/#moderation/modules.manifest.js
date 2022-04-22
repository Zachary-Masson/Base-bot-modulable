const {ModulesManifest} = require('../../libs/core');
module.exports = new ModulesManifest({
    name: "Moderation",
    tag: "#moderation",
    config: require('./config.json'),
    interactions: {
        commands: [
            require('./commands/ban'),
            require('./commands/kick'),
            require('./commands/say')
        ]
    },
});