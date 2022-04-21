const {Permissions} = require('discord.js');
import {readdirSync, existsSync} from "fs";
import {ErrorConsole} from "./Error";

const Core = {
    Modules: [],
    Events: [],
    Commands: [],
    Buttons: []
}

export const GetModules = async () => {
    const Modules = new Array();
    const ModulesFolders = await readdirSync(`${process.mainModule.path}/modules`).filter(folderName => folderName.startsWith('#'));
    await ModulesFolders.map(folderName => {
        if (!existsSync(`${process.mainModule.path}/modules/${folderName}/modules.manifest.js`)) return ErrorConsole(`"modules.manifest.js" does exist in ${folderName}`);
        Modules.push(require(`${process.mainModule.path}/modules/${folderName}/modules.manifest.js`).manifest);
    })
    Core.Modules = Modules;
}

export const ControllerModules = async () => {
    const Modules = new Array();
    await Core.Modules.map(module => {
        if (!module['name']) return ErrorConsole('');
        if (!module['tag']) return ErrorConsole('');
        Modules.push(module);
    })
    Core.Modules = Modules;
}

export const GetEvents = async () => {
    const Events = new Array();
    await Core.Modules.map(module => {
        if (!module['events'] || !module['events'][0]) return;
        module['events'].map(e => {
            e['modulesParent'] = module.tag;
            Events.push(e);
        })
    })
    Core.Events = Events;
}

export const GetCommands = async () => {
    const Commands = new Array();
    await Core.Modules.map(module => {
        if (!module['interactions']) return;
        const {commands} = module['interactions'];
        if (!commands || !commands[0]) return;
        commands.map(command => {
            command.commandData['modulesParent'] = module.tag;
            Commands.push(command);
        })
    })
    Core.Commands = Commands;
}

export const GetButtons = async () => {
    const Buttons = new Array();
    await Core.Modules.map(module => {
        if (!module['interactions']) return;
        const {buttons} = module['interactions'];
        if (!buttons || !buttons[0]) return;
        buttons.map(button => {
            button.buttonData['modulesParent'] = module.tag;
            Buttons.push(button);
        })
    })
    Core.Buttons = Buttons;
}

export const ControllerEvents = async () => {
    const Events = new Array();
    await Core.Events.map(event => {
        const {eventType, execute} = event;
        if (!eventType) return ErrorConsole('');
        if (!execute) return ErrorConsole('');
        Events.push(event);
    })
    Core.Events = Events;
}

export const ControllerCommands = async () => {
    const Commands = new Array();
    await Core.Commands.map(command => {
        const {commandData} = command;
        if (!commandData) return ErrorConsole('');
        if (!commandData['name']) return ErrorConsole('');
        if (!commandData['description']) return ErrorConsole('');
        if (commandData['permission'] && isNaN(parseInt(commandData['permission'])) && !Permissions.FLAGS[commandData['permission']]) return ErrorConsole('');
        Commands.push(command);
    })
    Core.Commands = Commands;
}

export const ControllerButtons = async () => {
    const Buttons = new Array();
    await Core.Buttons.map(button => {
        const {buttonData} = button;
        if (!buttonData['custom_id']) return ErrorConsole('');
        if (!buttonData['style']) return ErrorConsole('');
        if (!buttonData['label']) return ErrorConsole('');
        Buttons.push(button);
    })
    Core.Buttons = Buttons;
}

export const getCore = () => {
    return Core;
}