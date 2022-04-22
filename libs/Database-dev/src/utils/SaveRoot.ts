import {writeFileSync} from "fs";
import {verifyFile, getPath, getRoute} from "./RootData";

export default async (path: string) => {
    if (!verifyFile()) {
        writeFileSync(getPath(), JSON.stringify({root: path}))
    }

    if (getRoute() !== path) {
        writeFileSync(getPath(), JSON.stringify({root: path}))
    }
}