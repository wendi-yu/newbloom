import { Editor, Path, Transforms } from "slate";
import { ifCommentThreadsEqual } from "@/util/editorCommentUtils";
import {
  getCurrRedaction,
  getAllRedactions,
  ACCEPTED_PREFIX,
  REJECTED_PREFIX,
  SUGGESTION_PREFIX,
  insertRedaction,
  changeRedaction,
  isRedaction,
  getRedactionsOnTextNode,
} from "@/util/editorRedactionUtils";
import isHotkey from "is-hotkey";
import { getUserKeyBinds } from "./api/user_apis";

export function getTextFromSelection(editor) {
  return Editor.string(editor, editor.selection);
}

export function ifSelectionInTextNode(editor, leaf) {
  const selection = editor.selection;
  if (!selection) return false;
  const node = getFirstTextNodeAtSelection(editor, selection);
  return ifCommentThreadsEqual(node, leaf) ? true : false;
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

export function getCurrentPoint(editor) {
  const selectedPoint =
    editor.selection && Editor.point(editor, editor.selection.focus);

  return selectedPoint;
}

export function getNextRedaction(editor, redactions) {
  const curr = getCurrRedaction(editor, redactions);

  const index = redactions.findIndex((redaction) =>
    Path.equals(redaction.path, curr.path)
  );

  return redactions[(index + 1) % redactions.length];
}

export function getPreviousRedaction(editor, redactions) {
  const curr = getCurrRedaction(editor, redactions);

  const index = redactions.findIndex((redaction) =>
    Path.equals(redaction.path, curr.path)
  );

  return redactions[(index - 1) % redactions.length];
}

export function selectNode(editor, node) {
  //this selects the node but doesn't click it
  const range = Editor.range(editor, redaction.path);
  Transforms.select(editor, range);
}

export function setSelectionToCurrNodeEdges(editor) {
  const [start, end] = Editor.edges(editor, editor.selection.anchor.path);
  // Create a new range that spans the entire editor
  const range = { anchor: start, focus: end };

  // Update the selection to the new range
  Transforms.select(editor, range);
}

export function removeSelectedMark(editor, mark) {
  console.log(mark)
  const temp = editor.selection;

  setSelectionToCurrNodeEdges(editor);
  Editor.removeMark(editor, mark);

  // restore old selection
  editor.selection = temp;
}

export function handleChangeRedaction(editor, prefix) {
  const curr = editor.selection && Editor.node(editor, editor.selection.focus);
  const mark = Object.keys(curr[0])[1];

  if (prefix == "DELETE") {
    removeSelectedMark(editor, mark);
    return;
  }

  if (mark) {
    changeRedaction(editor, mark, prefix);
  }
}

export const extendSelectionByWord = (editor, direction) => {
  if (direction == "right") {
    Transforms.move(editor, {
      unit: "word",
      edge: "focus",
    });
  } else {
    Transforms.move(editor, {
      unit: "word",
      reverse: true,
      edge: "focus",
    });
  }
};

export const KeyBindings = {
  onKeyDown: (editor, event) => {
    const userHotkeys = getUserKeyBinds(false);
    // default behavior for arrow left and right
    if (isHotkey("ArrowLeft", event) || isHotkey("ArrowRight", event)) {
      return;
    }

    const currNode = getFirstTextNodeAtSelection(editor);

    //mask all other keys from working
    event.preventDefault();

    //handle undo/redo
    if (isHotkey("mod+" + userHotkeys.undo, event)) {
      event.shiftKey ? editor.redo() : editor.undo();
    }

    //handle loop through redactions
    else if (isHotkey(userHotkeys.next, event)) {
      const redactions = getAllRedactions(editor);
      if (event.shiftKey) {
        selectNode(editor, getPreviousRedaction(editor, redactions));
      } else {
        selectNode(editor, getNextRedaction(editor, redactions));
      }
    }

    // handle redaction popover
    else if (isHotkey(userHotkeys.accept, event)) {
      //only insert if no redaction or rejected redaction
      if (
        getRedactionsOnTextNode(currNode, ACCEPTED_PREFIX) ||
        getRedactionsOnTextNode(currNode, SUGGESTION_PREFIX)
      ) {
        handleChangeRedaction(editor, ACCEPTED_PREFIX);
      }
      insertRedaction(editor, ACCEPTED_PREFIX);
    } else if (isHotkey(userHotkeys.reject, event)) {
      handleChangeRedaction(editor, REJECTED_PREFIX);
    }

    // delete redaction mark
    else if (isHotkey(userHotkeys.delete, event) && isRedaction(currNode)) {
      handleChangeRedaction(editor, "DELETE");
    }

    //handle highlight w arrow keys
    else if (event.shiftKey && (event.ctrlKey || event.metaKey)) {
      if (
        event.key == userHotkeys.highlightRight ||
        event.key == userHotkeys.highlightLeft
      ) {
        const direction = event.key === "O" ? "right" : "left";
        extendSelectionByWord(editor, direction);
      }
    }

  },
};
