import {Editor, Path, Transforms } from "slate"
import { setSelectionToCurrNodeEdges, getCurrRedaction, getAllRedactions, ACCEPTED_PREFIX, REJECTED_PREFIX, SUGGESTION_PREFIX, insertRedaction, isRedactionFromMark} from "@/util/editorRedactionUtils";
import isHotkey from 'is-hotkey';

export function getTextFromSelection(editor) {
  return Editor.string(editor, editor.selection)
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
  const selectedPoint = editor.selection && Editor.point(editor, editor.selection.focus)
  
  return selectedPoint;
}

export function getNextRedaction(editor, redactions) {
  const curr = getCurrRedaction(editor, redactions);
  
  const index =  redactions.findIndex(redaction =>
    Path.equals(redaction.path, curr.path)
  );

  return redactions[(index + 1) % redactions.length];
}

export function getPreviousRedaction(editor, redactions) {
  const curr = getCurrRedaction(editor, redactions);
  
  const index =  redactions.findIndex(redaction =>
    Path.equals(redaction.path, curr.path)
  );

  return redactions[(index - 1) % redactions.length];
}

export function selectNode(editor, redaction) {

  //this selects the node but doesn't click it
  const range = Editor.range(editor, redaction.path);
  Transforms.setSelection(editor, range);

}

export function handleChangeRedaction (editor, prefix) {
  
  const curr = editor.selection && Editor.node(editor, editor.selection.focus)
  const mark = Object.keys(curr[0])[1]

  if (mark && isRedactionFromMark(mark)) {
    const temp = editor.selection
    setSelectionToCurrNodeEdges(editor)
    Editor.removeMark(editor, mark);
    if (prefix=='accepted') {
      insertRedaction(editor, ACCEPTED_PREFIX)
      
    } else {
      insertRedaction(editor, REJECTED_PREFIX)
    }

    editor.selection = temp

  }

}

export const extendSelectionByWord = (editor, direction) => {
  
  if (direction=="right") {
    Transforms.move(editor, {
      unit: 'word',
      edge: 'focus'
    })  
  } else {
    Transforms.move(editor, {
      unit: 'word',
      reverse: true,
      edge: 'focus'
    })
  }

};

export const KeyBindings = {
  onKeyDown: (editor, event) => {

    // default behavior for arrow left and right
    if (isHotkey("ArrowLeft", event) || isHotkey("ArrowRight", event)) {
      return;
    }

    //mask all other keys from working
    event.preventDefault();

    //handle undo/redo
    if (isHotkey("mod+z", event)) {
      event.shiftKey ? editor.redo() : editor.undo();
    } 

    //handle loop through redactions
    else if (isHotkey("Tab", event)) {
      const redactions = getAllRedactions(editor);
      if (event.shiftKey) {
        selectNode(editor, getPreviousRedaction(editor, redactions));
      } else {
        selectNode(editor, getNextRedaction(editor, redactions));
      }
    }

    // handle redaction popover
    else if (isHotkey("a", event)) {
      handleChangeRedaction(editor, 'accepted');
    }

    else if (isHotkey("s", event)) {
      handleChangeRedaction(editor, 'rejected');
    }

    // handle add redaction
    else if (isHotkey("w", event)) {
      insertRedaction(editor, SUGGESTION_PREFIX)
    }

    //handle highlight w arrow keys
    else if (event.shiftKey && (event.ctrlKey || event.metaKey)) {
      if (event.key=='O'||event.key=='I') {
        const direction = event.key === 'O' ? 'right' : 'left';
        extendSelectionByWord(editor, direction);
      }
    }

  },
};