const packagesJson = require('../package.json');
const {readdirSync} = require('fs');
const { execSync } = require('child_process')

const Interaction = require('./Interaction');
const DeployCommands = require('./DeployCommands');

const {GetModules, ControllerModules, getCore, GetEvents,
    ControllerEvents, GetCommands, ControllerCommands,
    GetButtons, ControllerButtons, CoreOptions, GetApi
} = require('../libs/core');

class ModulesClass {
    /**
     * @type module:events.EventEmitter
     * @private
     */
    _events;
    /**
     * @type Client
     * @private
     */
    _client;
    /**
     * @type {CoreOptions}
     * @private
     */
    _core
    _databaseModel;

    _modules;

    /**
     * @param {module:events.EventEmitter} Events
     * @param {Client} client
     * @param databaseModel
     */
    constructor(Events, client, databaseModel) {
        this._events = Events;
        this._client = client;
        this._modules = [];
        this._databaseModel = databaseModel;
        this.main();
    }

    main() {
        this.setBaseVarInClient();
        this.mapping();
        this._client.on('ready', () => DeployCommands(this._client.user.id, this._client.interactions.commands))
    }

    setBaseVarInClient() {
        this._client['interactions'] = {};
        this._client['interactions']['commands'] = [];
        this._client['interactions']['buttons'] = [];
    }

    /**
     * @private
     * @returns {Promise<void>}
     */
    async mapping() {
        await GetModules();
        await ControllerModules();
        await GetEvents();
        await ControllerEvents();
        await GetCommands();
        await ControllerCommands();
        await GetButtons();
        await ControllerButtons();
        await GetApi();
        this._core = getCore();
        require('./Server')({config: {}, events: this._events, client: this._client, databaseModel: this._databaseModel}, this._core.Modules, this._core.Api)
        this._modules = this._core.Modules;
        this._client['events'] = this._core.Events;
        this._client['interactions']['commands'] = this._core.Commands;
        this.initializeDefaultCommands();
        this._client['interactions']['buttons'] = this._core.Buttons;
        this.startEvents();
        this.addNewPackages();
        new Interaction(this._client, this._events, this._modules, this._databaseModel);
    }

    /**
     * @private
     */
    startEvents() {
        this._client['events'].map(event => {
            if (event.eventType === "ready") return this._client.on(event.eventType, event.execute.bind(this, {config: this._modules.filter(module => module.tag === event.modulesParent)[0].config, events: this._events, databaseModel: this._databaseModel}));
            this._client.on(event.eventType, event.execute.bind(this, {config: this._modules.filter(module => module.tag === event.modulesParent)[0].config, events: this._events, client: this._client, databaseModel: this._databaseModel}));
        })
    }

    initializeDefaultCommands() {
        const commandsFiles = readdirSync(`${__dirname}/commands/`)
        commandsFiles.map(fileName => {
            const commands = require(`${__dirname}/commands/${fileName}`);
            this._client.interactions.commands.push(commands);
        })
    }

    async addNewPackages() {
        const packages = [];
        const allPackages = [];
        let finalLineCommandsInstall = "npm i"
        await this._modules.map(module => {
            if (!module['packages']) return false;
            module.packages.map(pkg => {
                allPackages.push(pkg)
                if (packages.includes(pkg)) return;
                else return packages.push(pkg);
            })
        })
        packages.map(pkg => {
            if (!this.verifyInstallPackage(pkg)) return finalLineCommandsInstall += ` ${pkg}`
        })
        if (finalLineCommandsInstall !== "npm i") await execSync(finalLineCommandsInstall, {cwd: process.mainModule.path});
        this.cleanPackageJson(allPackages);
    }

    verifyInstallPackage(pkg) {
        return !!packagesJson.dependencies[pkg];
    }

    cleanPackageJson(packages) {
        let finalLineCommandsInstall = "npm remove"
        const packagesDefault = ['@discordjs/rest', 'discord-api-types', 'discord.js', 'dotenv', 'express', 'body-parser', 'cors'];
        Object.keys(packagesJson.dependencies).map(pkg => {
            if (packagesDefault.includes(pkg)) return;
            if (packages.includes(pkg)) return;
            return finalLineCommandsInstall += ` ${pkg}`;
        })
        if (finalLineCommandsInstall === "npm remove") return;
        execSync(finalLineCommandsInstall, {cwd: process.mainModule.path})
    }
}

module.exports = ModulesClass;