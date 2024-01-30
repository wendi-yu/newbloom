import { Node } from "slate"

export const toText = nodes => {
    if (!Array.isArray(nodes)) {
        nodes = [nodes]
    }
    let s = ""
    nodes.forEach(node => {
        for (const t of Node.texts(node)) {
            s += t[0].text
        }
    })
    return s
}
