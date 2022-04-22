const {ModulesManifest} = require('../../libs/core');
module.exports = new ModulesManifest({
    name: "messageStatus",
    tag: "#messageStatus",
    config: require('./config.json'),
    events: [
        require('./events/ready')
    ]
});