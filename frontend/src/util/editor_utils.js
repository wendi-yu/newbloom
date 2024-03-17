import {Editor, Path, Transforms } from "slate"
import { setSelectionToCurrNodeEdges, getCurrRedaction, getAllRedactions, ACCEPTED_PREFIX, REJECTED_PREFIX, SUGGESTION_PREFIX, insertRedaction, isRedactionFromMark} from "@/util/editorRedactionUtils";


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

function handleChangeRedaction (editor, prefix) {
  
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

const extendSelectionByWord = (editor, direction) => {
  
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

export const hotkeys = (event, editor) => {

  // handle left and right arrows (keep default behavior)
  if (event.key=='ArrowRight' || event.key=='ArrowLeft') {
    return;
  }

  const redactions = getAllRedactions(editor);
  event.preventDefault();

  // Handle undo/redo
  if (event.key === 'z' && event.shiftKey && (event.ctrlKey || event.metaKey)) {
    editor.redo();

  } else if (event.key === 'z' && (event.ctrlKey || event.metaKey)) {
    editor.undo();
  }
  
  // handle loop through redactions
  else if (event.key === 'Tab') {
    if (event.shiftKey) {
      selectNode(editor, getPreviousRedaction(editor, redactions));
    } else {
      selectNode(editor, getNextRedaction(editor, redactions));
    }
  }

  // handle redaction popover
  else if (event.key=='a') {
    handleChangeRedaction(editor, 'accepted');

  } else if (event.key=='s') {
    handleChangeRedaction(editor, 'rejected');
  
  }

  // handle add redaction
  else if (event.key=='w') {
    insertRedaction(editor, SUGGESTION_PREFIX)

  // handle add comment
  } else if (event.key=='d') {
    // const addComment = useAddCommentThreadToState()
    // insertCommentThread(editor, addComment)
  }
  
  // handle highlight with arrow keys
  else if (event.shiftKey && (event.ctrlKey || event.metaKey) && (event.key === 'O' || event.key === 'I')) {
    const direction = event.key === 'O' ? 'right' : 'left';
    extendSelectionByWord(editor, direction);

  } 

};
