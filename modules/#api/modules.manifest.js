const ModulesManifest = {
    name: "Api",
    tag: "#api",
    config: require('./config.json'),
    events: [
        {
            type: "ready",
            functions: [
                require('./src/server')
            ]
        }
    ],
    packages: [
        'express', "body-parser", "cors"
    ]
}
module.exports = ModulesManifest;