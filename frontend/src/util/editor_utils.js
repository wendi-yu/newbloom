import {Editor, Transforms, Path } from "slate"
import { getCurrRedaction, getAllRedactions } from "@/util/editorRedactionUtils";
import { ReactEditor } from "slate-react";

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

export function getNextRedaction(editor, redactions) {
  const curr = getCurrRedaction(editor, redactions);
  
  const index =  redactions.findIndex(redaction =>
    Path.equals(redaction.path, curr.path)
  );

  let next;
  if (index==redactions.length - 1) {
    next = redactions[0];
  } else {
    next = redactions [index + 1]
  }

  return next;
}

export function getPreviousRedaction(editor, redactions) {
  const curr = getCurrRedaction(editor, redactions);
  
  const index =  redactions.findIndex(redaction =>
    Path.equals(redaction.path, curr.path)
  );

  let prev;
  if (index == 0) {
    prev = redactions[redactions.length - 1];
  } else {
    prev = redactions [index - 1]
  }

  return prev;
}

//TODO: implement
export function selectNode(editor, node) {
  
  console.log(node)
  const range = Editor.range(editor, node.path);
  Transforms.setSelection(editor, range);
  
}

export const hotkeys = (event, editor) => {

  const redactions = getAllRedactions(editor);

  if (event.key === 'z' && event.ctrlKey) {
    event.preventDefault();
    console.log("undo")
    editor.undo();
  } else if (event.key === 'z' && event.shiftKey && event.ctrlKey) {
    event.preventDefault();
    console.log("redo")
    editor.redo();
  } else if (event.key === 'Tab' && event.shiftKey) {
    event.preventDefault();
    selectNode(editor, getPreviousRedaction(editor, redactions));
  } else if (event.key === 'Tab') {
    event.preventDefault();
    selectNode(editor, getNextRedaction(editor, redactions));
  } 
  else {
    event.preventDefault();
  }
};
