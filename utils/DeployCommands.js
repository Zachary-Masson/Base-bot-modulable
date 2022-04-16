const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const rest = new REST({ version: "9" }).setToken(process.env.BOT_TOKEN);

module.exports = async (clientID, commands) => {
    if (!commands[0]) return;
    const Commands = [];
    commands.map(command => {
        Commands.push(command.Data);
    });
    await (async () => {
        try {
            await rest.put(Routes.applicationCommands(clientID), {
                body: Commands,
            });
        } catch (error) {
            console.log(error);
            process.exit(1);
        }
    })();
}