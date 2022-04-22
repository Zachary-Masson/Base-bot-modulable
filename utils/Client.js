require('dotenv').config()

const events = require('events');

const { Client, Intents } = require("discord.js");
const {debug} = require("../libs/debug");
const Modules = require('./Modules');
const ModulesClass = require("./Modules");

class ClientClass {
    /**
     * @type Client
     * @private
     */
    _client;
    /**
     * @type module:events.EventEmitter
     * @private
     */
    _events;
    _databaseModel;

    /**
     * @param {module:events.EventEmitter} Events
     */
    constructor(Events, databaseModel) {
        this._events = Events
        this._databaseModel = databaseModel;
        this.main();
    }

    // methods

    /**
     * @private
     */
    main() {
        this._client = new Client({
            partials: ["CHANNEL", "ROLES"],
            intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MEMBERS,
                Intents.FLAGS.GUILD_MESSAGES,
                Intents.FLAGS.DIRECT_MESSAGES,
                Intents.FLAGS.DIRECT_MESSAGE_TYPING,
            ],
        });
        new ModulesClass(this._events, this._client, this._databaseModel);
        this.launch();
        // "process.mainModule.path" get path root
    }

    /**
     * @private
     */
    async launch() {
        await this._client.login(process.env.BOT_TOKEN);
        debug({type: "title"}, "Client");
        debug({type: "success", replaces: [{String: "{{ clientTag }}", data: `${this._client.user.username}$→#$${this._client.user.discriminator}`}]}, "{{ clientTag }} is $→connected$ !")
    }

    // setters

    // getters
    get client() {
        return this._client;
    }

}

module.exports = ClientClass;