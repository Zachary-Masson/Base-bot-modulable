const {readFileSync, existsSync} = require('fs');
const config = require('../config/saveRoot.json');

const dataPath = () => {
    const path = __dirname.split('\\');
    const basePath = path.slice(0, path.length - 1).join('\\');
    return `${basePath}\\config\\${config.nameOfFile}`;
}

exports.verifyFile = () => {
    return existsSync(dataPath())
}

exports.getRoute = () => {
    return JSON.parse(readFileSync(dataPath(), {encoding: "utf-8"}))['root'];
}

exports.getPath = () => {
    return dataPath()
}