const {ModulesManifest} = require('../../libs/core');
module.exports = new ModulesManifest({
    name: "MessageStatus",
    tag: "#messageStatus",
    config: require('./config.json'),
    events: [
        require('./events/ready')
    ]
});