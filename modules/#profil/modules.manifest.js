const {ModulesManifest, Event, Command, Button} = require('../../libs/core');
module.exports = new ModulesManifest({
    name: "profil",
    tag: "#profil",
    events: [
        new Event('ready').setExecute((options, client) => {})
    ],
    interactions: {
        commands: [
            new Command({
                name: "login",
                description: "login user"
            }).setExecute((options, interaction) => {})
        ],
        buttons: [
            new Button({
               custom_id: "valide",
                style: "PRIMARY",
                label: "Valide"
            }).setExecute((options, interaction) => {})
        ]
    },
    api: require('./api')
})