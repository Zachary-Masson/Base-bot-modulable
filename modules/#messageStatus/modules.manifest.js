const ModulesManifest = {
    name: "MessageStatus",
    tag: "#messageStatus",
    config: require('./config.json'),
    events: [
        {
            type: "ready",
            functions: [
                require('./events/ready')
            ]
        }
    ]
}

module.exports = ModulesManifest;