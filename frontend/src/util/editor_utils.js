import {Editor, Range} from "slate"
import { getCurrMark, getAllMarks } from "@/util/editorRedactionUtils";

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

export function getNextMark(editor, marks) {
  let currMark = getCurrMark(editor);



}

export function getPreviousMark(editor, marks) {
  let currMark = getCurrMark(editor);
  

}

export const hotkeys = (event, editor) => {

  const marks = getAllMarks(editor);

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
    Editor.selection = getPreviousMark(editor, marks);
  } else if (event.key === 'Tab') {
    event.preventDefault();
    Editor.selection = getNextMark(editor, marks);
  } 
  else {
    event.preventDefault();
  }
};
