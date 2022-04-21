import config from "../config/index.json";
import {existsSync, readFileSync} from "fs";

const dataPath = () => {
    const path = __dirname.split('\\');
    const basePath = path.slice(0, path.length - 1).join('\\');
    return `${basePath}\\src\\config\\${config.nameOfFile}`;
}

export const verifyFile = () => {
    return existsSync(dataPath());
}

export const getRoute = () => {
    return JSON.parse(readFileSync(dataPath(), {encoding: "utf-8"}))['root'];
}

export const getPath = () => {
    return dataPath()
}