export const toText = node => {
    return toTextRecursive("", node)
}

// DFS through the node tree and concatenate all the text
const toTextRecursive = (text, node) => {
    // leaf nodes
    if (node.text) {
        text += node.text
        return text
    }
    if (node.children) {// intermediate nodes (paragraphs??)
        text += '\n'
        node.children.forEach(child => {
            text = toTextRecursive(text, child)
        })
        return text
    }
    return text
}
