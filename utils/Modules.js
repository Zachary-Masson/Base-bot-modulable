const events = require('events');
const { Client } = require("discord.js");

const { readdirSync, existsSync } = require('fs');
const Debug = require('./development/Debug');
const Interaction = require('./Interaction');
const DeployCommands = require('./DeployCommands');

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
     * @type Debug
     * @private
     */
    _debug;

    _modules;

    /**
     * @param {module:events.EventEmitter} Events
     * @param {Client} client
     */
    constructor(Events, client) {
        this._events = Events;
        this._client = client;
        this._debug = new Debug();
        this._modules = new Array();
        this.main();
    }

    main() {
        this._debug.message = "Mapping Modules";
        this._debug.createCategory();
        this.setBaseVarInClient();
        this.mapping();
        this._client.on('ready', () => DeployCommands(this._client.user.id, this._client.interaction.commands))
    }

    setBaseVarInClient() {
        this._client['interaction'] = {};
        this._client.interaction['commands'] = [];
    }

    /**
     * @private
     * @returns {Promise<void>}
     */
    async mapping() {
        let modulesDir = readdirSync(`${process.mainModule.path}/modules`).filter(data => data.startsWith('#'))
        if (!modulesDir[0]) return this.error('Missing $cModules$s in the $cfolder$s "modules" !')
        modulesDir.map(folderName => {
            if (!this.verifyManifestExist(folderName)) {
                this.error(`($c${folderName}$s) the "modules.manifest.js" $cdoes exist$s in root !`);
            } else {
                const manifest = require(`${process.mainModule.path}/modules/${folderName}/modules.manifest`);
                this.modulesController(manifest);
            }
        })
        this.startEvents();
        this.saveInteraction();
        new Interaction(this._client, events, this._modules);
    }

    /**
     * @private
     * @param manifest
     */
    modulesController(manifest) {
        const {name, tag, config, events, interaction} = manifest;
        if (!name) return this.error('Missing $cname$s in "modules.manifest.js" !');
        if (!tag) return this.error('Missing $ctag$s in "modules.manifest.js" !');
        if (events) {
            if (!this.eventsController(events)) return;
        }
        this._modules.push({
            name,
            tag,
            config: config ? config : {},
            events,
            interaction
        })
    }

    /**
     * @private
     */
    startEvents() {
        this._modules.map(module => {
            this._debug.message = this._debug.config["debug.start_modules"].message.replace('{{ module.tag }}', module.tag)
            this._debug.create('start_modules')
            if (!module['events']) return;
            module.events.map(e => {
                e.functions.map(func => {
                    this._client.on(e.type, func.bind(this, module.config, this._events))
                })
            })
        });

    }

    /**
     * @private
     * @param events
     * @returns {boolean}
     */
    eventsController(events) {
        let notError = true;
        events.map(e => {
            const {type, functions} = e;
            if (!type) {notError = false;return this.error('Missing $ctype$s of events !');}
            if (!functions || !functions[0]) {notError = false;return this.error('Missing $cfunctions$s of events !');}
        })
        return notError;
    }

    saveInteraction() {
        this._modules.map(module => {
            if (!module['interaction']) return;
            if (module['interaction']['commands']) {
                module['interaction']['commands'].map(commands => {
                    if (!commands['Data']) return this.error(`Missing $cData$s "${module.tag}/"`);
                    if (!commands['Data']['name']) return this.error(`Missing $cname$s of commands "${module.tag}/"`);
                    if (!commands['Data']['description']) return this.error(`Missing $cdescription$s of commands "${module.tag}/${commands['Data']['name']}"`);
                    commands['Data']['modulesParent'] = module.tag;
                    this._client.interaction.commands.push(commands)
                })
            }
        })
    }

    error(message) {
        this._debug.message = message
        this._debug.create('error');
    }

    /**
     * @private
     * @param {String} folderName
     * @returns {boolean}
     */
    verifyManifestExist(folderName) {
        return existsSync(`${process.mainModule.path}/modules/${folderName}/modules.manifest.js`);
    }
}

module.exports = ModulesClass;