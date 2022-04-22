const {ModulesManifest} = require('../../libs/core');
module.exports = new ModulesManifest({
    tag: "#messageStatus",
    config: require('./config.json'),
    events: [
        require('./events/ready')
    ]
});