import { v4 as uuid } from "uuid";
import { Editor, Transforms, Range } from 'slate';

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

export function insertRedaction(editor, addRedactionToState, target) {
  const threadID = uuid();
  const newRedaction = {
    redactions: [],
    creationTime: new Date(),
    status: "open",
  };
  addRedactionToState(threadID, newRedaction);
  Editor.addMark(editor, getMarkForRedactionID(threadID, target), true);
  return threadID;
}

function selectAllText(editor) {
  // Get the start and end points of the editor
  const [start, end] = Editor.edges(editor, [0]);

  // Create a new range that spans the entire editor
  const range = { anchor: start, focus: end };

  // Update the selection to the new range
  Transforms.select(editor, range);
}

export function removeRedaction(editor, mark) {
  // removeMark only removes all instances of the mark within the current selection, so select everything then remove

  // store the old selection to restore it afterwards
  const temp = editor.selection
  selectAllText(editor);
  Editor.removeMark(editor, mark);

  // restore old selection
  editor.selection = temp
}