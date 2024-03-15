import {Editor, Path, Transforms } from "slate"
import { changeRedaction, getCurrRedaction, getAllRedactions, ACCEPTED_PREFIX, REJECTED_PREFIX, getMarkFromLeaf } from "@/util/editorRedactionUtils";

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


export function selectNode(editor, redaction) {

  //const span= document.querySelector(domNode)

  // const domNode = ReactEditor.toDOMNode(editor, redaction.node);
  // console.log(domNode);

  // // ReactEditor.focus(editor);
  // // domNode.focus();
  // domNode.dispatchEvent(new MouseEvent('click'));

  // const point = Editor.point(editor, redaction.path, 0);
  // const domPoint = ReactEditor.toDOMPoint(editor, point);
  // //console.log(domPoint)


  // node.dispatchEvent(new MouseEvent('click'));

  // selection.removeAllRanges();

  // this removes both elements all together
  // const anchorElement = document.createElement('a');
  // anchorElement.appendChild(domNode);
  // anchorElement.dispatchEvent(new MouseEvent('click'));
  
  // const range = Editor.range(editor, redaction.path);
  // const domRange = ReactEditor.toDOMRange(editor, range);
  // console.log(domRange)

  //this selects the node but doesn't click it
  const range = Editor.range(editor, redaction.path);
  Transforms.setSelection(editor, range);


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

  const redactions = getAllRedactions(editor);

  // Handle undo/redo
  if (event.key === 'z' && event.shiftKey && (event.ctrlKey || event.metaKey)) {
    event.preventDefault();
    editor.redo();

  } else if (event.key === 'z' && (event.ctrlKey || event.metaKey)) {
    event.preventDefault();
    editor.undo();
  }
  
  // handle loop through redactions
  else if (event.key === 'Tab') {
    event.preventDefault();
    if (event.shiftKey) {
      selectNode(editor, getPreviousRedaction(editor, redactions));
    } else {
      selectNode(editor, getNextRedaction(editor, redactions));
    }
  }

  // handle redaction popover
  else if (event.key=='a') {
    event.preventDefault();
    const mark = getCurrRedaction(editor, redactions)
    changeRedaction(editor, getMarkFromLeaf(mark.node), ACCEPTED_PREFIX)

  } else if (event.key=='r') {
    event.preventDefault();
    const mark = getCurrRedaction(editor, redactions)
    changeRedaction(editor, getMarkFromLeaf(mark.node), REJECTED_PREFIX)
  }
  
  // handle highlight with arrow keys
  else if (event.shiftKey && (event.ctrlKey || event.metaKey) && (event.key === 'O' || event.key === 'I')) {
    
    event.preventDefault();
    const direction = event.key === 'O' ? 'right' : 'left';
    extendSelectionByWord(editor, direction);

  } else {
    event.preventDefault();
  }
};
