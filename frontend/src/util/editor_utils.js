import {Editor, Path, Transforms, Element } from "slate"
import { setSelectionToCurrNodeEdges, getCurrRedaction, getAllRedactions, ACCEPTED_PREFIX, REJECTED_PREFIX, SUGGESTION_PREFIX, insertRedaction, isRedactionFromMark} from "@/util/editorRedactionUtils";

export function getAllMarks(editor) {
  const marks = new Set();

  const iterate = (node) => {
    if (Element.isElement(node)) {
      node.children.forEach((child) => iterate(child));
    } else {
      node.marks.forEach(mark => marks.add(mark));
    }
  };

  const { children } = editor;
  children.forEach((node) => iterate(node));

  return Array.from(marks);
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
    handleChangeRedaction(editor, redactions, 'accepted');

  } else if (event.key=='s') {
    handleChangeRedaction(editor, redactions, 'rejected');
  }

  // handle add redaction
  else if (event.key=='w') {
    insertRedaction(editor, SUGGESTION_PREFIX)
  }
  
  // handle highlight with arrow keys
  else if (event.shiftKey && (event.ctrlKey || event.metaKey) && (event.key === 'O' || event.key === 'I')) {
    
    const direction = event.key === 'O' ? 'right' : 'left';
    extendSelectionByWord(editor, direction);

  } 
};
