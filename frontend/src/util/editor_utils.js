import {Editor, Range} from "slate"

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

export function getNextMark(currMark, marks) {
  console.log("marks" + marks)
  console.log(currMark)

}

export function getPreviousMark(currMark, marks) {
  

}

export const hotkeys = (event, editor) => {

  let currMark = editor.selection;
  const marks = Range.getMarks(editor, currMark);

  if (event.key === 'z' && event.ctrlKey) {
    event.preventDefault();
    editor.undo();
  } else if (event.key === 'z' && event.shiftKey) {
    event.preventDefault();
    editor.redo();
  } else if (event.key === 'Tab' && event.shiftKey) {
    event.preventDefault();
    // getNextMark(currMark, marks);
  } else if (event.key === 'Tab') {
    event.preventDefault();
    getNextMark(currMark, marks);
  } 
  else {
    // next();
  }
};
