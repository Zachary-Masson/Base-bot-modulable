const {Permissions} = require('discord.js');
import {readdirSync, existsSync} from "fs";
import {debug} from "../../../debug";

const Core = {
    Modules: [],
    Events: [],
    Commands: [],
    Buttons: [],
    Api: [],
}

export const GetModules = async () => {
    const Modules = new Array();
    debug({type: "title"}, "Modules");
    const ModulesFolders = await readdirSync(`${process.mainModule.path}/modules`).filter(folderName => folderName.startsWith('#'));
    await ModulesFolders.map(folderName => {
        if (!existsSync(`${process.mainModule.path}/modules/${folderName}/modules.manifest.js`))  return debug({type: "error"}, `"$→modules.manifest.js$" does $→exist$ in $→${folderName}$`);
        const Module = require(`${process.mainModule.path}/modules/${folderName}/modules.manifest.js`);
        Module['folderName'] = folderName;
        Modules.push(Module);
    })
    Core.Modules = Modules;
}

export const ControllerModules = async () => {
    const Modules = new Array();
    await Core.Modules.map(module => {
        const manifest = module.manifest;
        if (!manifest) return debug({type: "error", replaces: [{String: "{{ moduleFolderName }}", data: module['folderName']}]}, `($→{{ moduleFolderName }}$) Missing '$→ModulesManifest$' !`);
        if (!manifest['name']) return debug({type: "error", replaces: [{String: "{{ moduleFolderName }}", data: module['folderName']}]}, `($→{{ moduleFolderName }}$) Missing '$→name$' !`);
        if (!manifest['tag']) return debug({type: "error", replaces: [{String: "{{ moduleFolderName }}", data: module['folderName']}]}, `($→{{ moduleFolderName }}$) Missing '$→tag$' !`);
        if (!manifest['tag'].startsWith('#')) return debug({type: "error", replaces: [{String: "{{ moduleFolderName }}", data: module['folderName']}]}, `($→{{ moduleFolderName }}$) Missing '$→#$' in $→tag$. Exemple : "$→#$modulesTag" !`);
        debug({type: "modules", module: manifest.tag}, "is properly $→Controller$ and $→Start$ !");
        Modules.push(manifest);
    })
    Core.Modules = Modules;
}

export const GetEvents = async () => {
    const Events = new Array();
    debug({type: "title"}, "Events");
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
    debug({type: "title"}, "Commands");
    await Core.Modules.map(module => {
        if (!module['interactions']) return;
        const {commands} = module['interactions'];
        if (!commands || !commands[0]) return;
        commands.map(command => {
            command['modulesParent'] = module.tag;
            Commands.push(command);
        })
    })
    Core.Commands = Commands;
}

export const GetButtons = async () => {
    const Buttons = new Array();
    debug({type: "title"}, "Buttons");
    await Core.Modules.map(module => {
        if (!module['interactions']) return;
        const {buttons} = module['interactions'];
        if (!buttons || !buttons[0]) return;
        buttons.map(button => {
            button['modulesParent'] = module.tag;
            Buttons.push(button);
        })
    })
    Core.Buttons = Buttons;
}

export const GetApi = async () => {
    const Api = new Array();
    await Core.Modules.map(module => {
        if (!module['api']) return;
        module['api']['modulesParent'] = module.name;
        Api.push(module['api'])
    })
    Core.Api = Api;
}

export const ControllerEvents = async () => {
    const Events = new Array();
    await Core.Events.map(event => {
        const {eventType, execute} = event;
        if (!eventType) return debug({type: "error", replaces: [{String: "{{ moduleTag }}", data: event['modulesParent']}]}, `($→{{ moduleTag }}$) Missing '$→eventType$' !`);;
        if (!execute) return debug({type: "error", replaces: [{String: "{{ moduleTag }}", data: event['modulesParent']}, {String: "{{ eventType }}", data: eventType}]}, `($→{{ moduleTag }}$) ($→{{ eventType }}$) Missing '$→execute$' !`);
        debug({type: "module", module: event.modulesParent, replaces: [{String: "{{ eventType }}", data: eventType}]}, "Event [$→{{ eventType }}$] $→Controller$ and $→Start$ !");
        Events.push(event);
    })
    Core.Events = Events;
}

export const ControllerCommands = async () => {
    const Commands = new Array();
    await Core.Commands.map(command => {
        const {commandData, execute} = command;
        if (!commandData) return debug({type: "error", replaces: [{String: "{{ moduleTag }}", data: command['modulesParent']}]}, `($→{{ moduleTag }}$) Missing '$→commandData$' !`);
        if (!commandData['name']) return debug({type: "error", replaces: [{String: "{{ moduleTag }}", data: command['modulesParent']}]}, `($→{{ moduleTag }}$) Missing Command '$→name$' !`);
        if (!commandData['description']) return debug({type: "error", replaces: [{String: "{{ moduleTag }}", data: command['modulesParent']},{String: "{{ commandName }}", data: commandData['name']}]}, `($→{{ moduleTag }}$) ($→{{ commandName }}$) Missing Command '$→description$' !`);
        if (commandData['permission'] && isNaN(parseInt(commandData['permission'])) && !Permissions.FLAGS[commandData['permission']]) return debug({type: "error", replaces: [{String: "{{ moduleTag }}", data: command['modulesParent']},{String: "{{ commandName }}", data: commandData['name']},{String: "{{ commandPermission }}", data: commandData['permission']}]}, `($→{{ moduleTag }}$) ($→{{ commandName }}$) The $→Permission$ "$→{{ commandPermission }}$" is not available !`);
        if (!execute) return debug({type: "error", replaces: [{String: "{{ moduleTag }}", data: command['modulesParent']},{String: "{{ commandName }}", data: commandData['name']}]}, `($→{{ moduleTag }}$) ($→{{ commandName }}$) Missing Command '$→execute$' !`);
        debug({type: "module", module: command.modulesParent, replaces: [{String: "{{ commandName }}", data: commandData['name']}]}, "Command [$→{{ commandName }}$] $→Controller$ and $→Start$ !");
        Commands.push(command);
    })
    Core.Commands = Commands;
}

export const ControllerButtons = async () => {
    const Buttons = new Array();
    await Core.Buttons.map(button => {
        const {buttonData, execute} = button;
        if (!buttonData) return debug({type: "error", replaces: [{String: "{{ moduleTag }}", data: button['modulesParent']}]}, `($→{{ moduleTag }}$) Missing Button '$→buttonData$' !`);
        if (!buttonData['custom_id']) return debug({type: "error", replaces: [{String: "{{ moduleTag }}", data: button['modulesParent']}]}, `($→{{ moduleTag }}$) Missing Button '$→custom_id$' !`);
        if (!buttonData['style']) return debug({type: "error", replaces: [{String: "{{ moduleTag }}", data: button['modulesParent']},{String: "{{ buttonCustomId }}", data: buttonData['custom_id']}]}, `($→{{ moduleTag }}$) ($→{{ buttonCustomId }}$) Missing Button '$→style$' !`);
        if (!buttonData['label']) return debug({type: "error", replaces: [{String: "{{ moduleTag }}", data: button['modulesParent']},{String: "{{ buttonCustomId }}", data: buttonData['custom_id']}]}, `($→{{ moduleTag }}$) ($→{{ buttonCustomId }}$) Missing Button '$→label$' !`);
        if (!execute) return debug({type: "error", replaces: [{String: "{{ moduleTag }}", data: button['modulesParent']},{String: "{{ buttonCustomId }}", data: buttonData['custom_id']}]}, `($→{{ moduleTag }}$) ($→{{ buttonCustomId }}$) Missing Button '$→execute$' !`);
        debug({type: "module", module: button['modulesParent'], replaces: [{String: "{{ buttonCustomId }}", data: buttonData['custom_id']}]}, "Buttons [$→{{ buttonCustomId }}$] $→Controller$ and $→Start$ !");
        Buttons.push(button);
    })
    Core.Buttons = Buttons;
}

export const getCore = () => {
    return Core;
}