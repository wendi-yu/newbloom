const REDACTION_PREFIX = "redaction_";
import { v4 as uuid } from "uuid";
import { Editor } from 'slate'

export function getRedactionsOnTextNode(textNode) {
  return new Set(
    Object.keys(textNode)
      .filter(isRedactionIDMark)
      .map(getRedactionIDFromMark)
  );
}

export function getRedactionIDFromMark(mark) {
  if (!isRedactionIDMark(mark)) {
    throw new Error("Expected mark to be of a redaction");
  }
  return mark.replace(REDACTION_PREFIX, "");
}

function isRedactionIDMark(mayBeRedaction) {
  return mayBeRedaction.indexOf(REDACTION_PREFIX) === 0;
}

export function getMarkForRedactionID(threadID) {
  return `${REDACTION_PREFIX}${threadID}`;
}

export function insertRedaction(editor, addRedactionToState) {
  const threadID = uuid();
  const newRedaction = {
      redactions: [],
      creationTime: new Date(),
      status: "open",
  };
  addRedactionToState(threadID, newRedaction);
  Editor.addMark(editor, getMarkForRedactionID(threadID), true);
  return threadID;
}

export function removeRedaction(editor, removeRedactionFromState, redactionID) {
  Editor.removeMark(editor, getMarkForRedactionID(redactionID));
  removeRedactionFromState(redactionID);
}