export function getTextBlockStyle(editor) {
    const selection = editor.selection;
    if (selection == null) {
      return null;
    }
  
    const topLevelBlockNodesInSelection = Editor.nodes(editor, {
      at: editor.selection,
      mode: "highest",
      match: (n) => Editor.isBlock(editor, n),
    });
  
    let blockType = null;
    let nodeEntry = topLevelBlockNodesInSelection.next();
    while (!nodeEntry.done) {
      const [node, _] = nodeEntry.value;
      if (blockType == null) {
        blockType = node.type;
      } else if (blockType !== node.type) {
        return "multiple";
      }
  
      nodeEntry = topLevelBlockNodesInSelection.next();
    }
  
    return blockType;
  }

  export function getFirstTextNodeAtSelection(editor, selection) {
    const selectionForNode = selection ?? editor.selection;
  
    if (selectionForNode == null) {
      return null;
    }
  
    const textNodeEntry = Editor.nodes(editor, {
      at: selectionForNode,
      mode: "lowest",
      match: Text.isText,
    }).next().value;
  
    return textNodeEntry != null ? textNodeEntry[0] : null;
  }