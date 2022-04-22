import {xterm} from "cli-color";

export const SetColor = (String: string, color: number) => {
    let Text = String;
    const part = String.split('$');
    part.map(p => {
        if (p.startsWith('→')) {
            const text = p.slice(1, p.length)
            Text = Text.replace(`$${p}$`, xterm(color)(text))
        }
    })
    return Text
}