import { Node } from "slate"

export const toText = node => {
    let s = ""
    for (const t of Node.texts(node)) {
        s += t[0].text
    }
    return s
}
