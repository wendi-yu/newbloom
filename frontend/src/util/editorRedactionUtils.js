import { v4 as uuid } from "uuid";
import { Editor } from "slate";

import { setSelectionToCurrNodeEdges } from "@/util/editor_utils";

export const SUGGESTION_PREFIX = "suggestion_";
export const REJECTED_PREFIX = "rejected_";
export const ACCEPTED_PREFIX = "accepted_";

export function getRedactionsOnTextNode(textNode, target) {
  return new Set(
    Object.keys(textNode)
      .filter((node) => isRedactionIDMark(node, target))
      .map((mark) => getRedactionIDFromMark(mark, target))
  );
}

export function isRedactionFromMark(mark) {
  if (!mark) {
    return false;
  }
  if (
    mark.startsWith(ACCEPTED_PREFIX) ||
    mark.startsWith(REJECTED_PREFIX) ||
    mark.startsWith(SUGGESTION_PREFIX)
  ) {
    return true;
  }
  return false;
}

export function getTargetFromMark(mark) {
  let res = null;
  [ACCEPTED_PREFIX, SUGGESTION_PREFIX, REJECTED_PREFIX].forEach((pre) => {
    if (mark.includes(pre)) {
      res = pre;
    }
  });
  return res;
}

export function getMarkFromLeaf(leaf) {
  const key = Object.keys(leaf);
  return key[1];
}

export function replaceRedactionWithX(leaf) {
  const key = Object.keys(leaf);
  const temp = leaf[key[0]];

  leaf[key[0]] = "X".repeat(temp.length);
}

export function getRedactionIDFromMark(mark, target) {
  if (!isRedactionIDMark(mark, target)) {
    throw new Error("Expected mark to be of a redaction");
  }
  return mark.replace(target, "");
}

export function isRedactionIDMark(mayBeRedaction, target) {
  return mayBeRedaction.indexOf(target) === 0;
}

export function getMarkForRedactionID(threadID, target) {
  return `${target}${threadID}`;
}

export function insertRedaction(editor, target) {
  //check if editor already has a redaction
  const threadID = uuid();
  Editor.addMark(editor, getMarkForRedactionID(threadID, target), true);
  return threadID;
}

export function changeRedaction(editor, mark, target) {
  // removeMark only removes all instances of the mark within the current selection, so select everything then remove

  // store the old selection to restore it afterwards
  const temp = editor.selection;

  setSelectionToCurrNodeEdges(editor);
  Editor.removeMark(editor, mark);
  insertRedaction(editor, target);

  // restore old selection
  editor.selection = temp;
}

export function getCurrRedaction(editor, redactions) {
  const selectedNode =
    editor.selection && Editor.node(editor, editor.selection.focus);

  //if the user is selecting a redaction, this is the current redaction
  if (isRedaction(selectedNode[0])) {
    return { node: selectedNode[0], path: selectedNode[1] };
  }

  //otherwise select the first redaction mark
  return redactions[0];
}

export function isRedaction(leaf) {
  const isSuggested = getRedactionsOnTextNode(leaf, SUGGESTION_PREFIX).size > 0;
  const isRejected = getRedactionsOnTextNode(leaf, REJECTED_PREFIX).size > 0;
  const isAccepted = getRedactionsOnTextNode(leaf, ACCEPTED_PREFIX).size > 0;

  return isSuggested || isRejected || isAccepted;
}

export function getAllRedactions(editor) {
  let redactions = [];

  editor.children.forEach((children, index) => {
    children.children.forEach((child, childIndex) => {
      if (isRedaction(child)) {
        const path = [index, childIndex];
        redactions.push({ node: child, path });
      }
    });
  });

  return redactions;
}
