import { v4 as uuid } from "uuid";
import { Editor, Transforms } from 'slate';

export const SUGGESTION_PREFIX = "suggestion_";
export const REJECTED_PREFIX = "rejected_";
export const ACCEPTED_PREFIX = "accepted_";

export function getRedactionsOnTextNode(textNode, target) {
  return new Set(
    Object.keys(textNode)
      .filter(node => isRedactionIDMark(node, target))
      .map(mark => getRedactionIDFromMark(mark, target))
  );
}

export function getMarkFromLeaf(leaf) {
  const key = Object.keys(leaf)
  return key[1];
}

export function replaceRedactionWithX(leaf) {
  const key = Object.keys(leaf)
  const temp = leaf[key[0]]

  leaf[key[0]] = 'X'.repeat(temp.length)

}

export function getRedactionIDFromMark(mark, target) {
  if (!isRedactionIDMark(mark, target)) {
    throw new Error("Expected mark to be of a redaction");
  }
  return mark.replace(target, "");
}

function isRedactionIDMark(mayBeRedaction, target) {
  return mayBeRedaction.indexOf(target) === 0;
}

export function getMarkForRedactionID(threadID, target) {
  return `${target}${threadID}`;
}

export function insertRedaction(editor, target) {
  const threadID = uuid();
  Editor.addMark(editor, getMarkForRedactionID(threadID, target), true);
  return threadID;
}


function setSelectionToCurrNodeEdges(editor) {
  const [start, end] = Editor.edges(editor, editor.selection.anchor.path)
  // Create a new range that spans the entire editor
  const range = { anchor: start, focus: end };

  // Update the selection to the new range
  Transforms.select(editor, range);
}


export function changeRedaction(editor, mark, target) {
  // removeMark only removes all instances of the mark within the current selection, so select everything then remove

  // store the old selection to restore it afterwards
  const temp = editor.selection


  setSelectionToCurrNodeEdges(editor)
  Editor.removeMark(editor, mark);
  insertRedaction(editor, target)

  // restore old selection
  editor.selection = temp
}

export function getCurrMark(editor) {

  //if the user is selecting a redaction, this is the current redaction
  if (Editor.selection) {
    console.log(editor.selection);
    return currMark = Editor.selection;
  }

  //otherwise select the first redaction mark
  marks = getAllMarks(editor);
  return marks[0];
}

//TODO: implement
export function getAllMarks(editor) {
  const marks = [];
  
  return marks;
}