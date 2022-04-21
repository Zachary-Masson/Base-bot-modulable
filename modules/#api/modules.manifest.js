const {ModulesManifest} = require('../../libs/core');
module.exports = new ModulesManifest({
    name: "Api",
    tag: "#api",
    config: require('./config.json'),
    events: [
        require('./src/server')
    ],
    packages: [
        'express', "body-parser", "cors"
    ]
});