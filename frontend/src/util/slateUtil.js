import { Node, Transforms } from "slate";
import { createEditor } from "slate";
import { SUGGESTION_PREFIX, insertRedaction } from "./editorRedactionUtils";

export const toText = (nodes) => {
  if (!Array.isArray(nodes)) {
    nodes = [nodes];
  }
  let s = "";
  nodes.forEach((node) => {
    for (const t of Node.texts(node)) {
      s += t[0].text;
    }
  });
  return s;
};

export const toSlateFormat = (text, redactions) => {
  // get the separated paragraph strings
  const paragraphs = text.split("\n\n");

  // get the indexes where the split happens
  let counter = 0;
  const paragraphSplits = paragraphs.map((par) => {
    // add 2 to compensate for the 2 \n characters that are missing
    counter += par.length + 2;
    return counter;
  });

  // sort the redactions
  const redactionsOrdered = redactions.sort((a, b) => a.start - b.start);

  // final result to iterate through: pair paragraph strings with their lists of redactions
  // redaction indices must be normalized to the paragraph
  const paragraphsWithRedactions = paragraphs.map((par) => {
    return {
      text: par,
      redactions: [],
    };
  });

  // go through all the redactions, keep track of which paragraph's index range we're currently in
  // to be able to sort the redaction into the right bucket
  let currentParagraph = 0;
  redactionsOrdered.forEach((redaction) => {
    // update paragraph counter
    if (redaction.start > paragraphSplits[currentParagraph]) {
      currentParagraph++;
    }

    // for normalizing the redaction list character index
    const idxOfLastSplit =
      currentParagraph == 0 ? 0 : paragraphSplits[currentParagraph - 1];
    paragraphsWithRedactions[currentParagraph].redactions.push({
      start: redaction.start - idxOfLastSplit,
      end: redaction.end - idxOfLastSplit,
    });
  });

  // apply the slate transformation to each paragraph individually
  return paragraphsWithRedactions.map((parRed) => {
    return {
      type: "paragraph",
      children: paragraphToSlateFormat(parRed.text, parRed.redactions),
    };
  });
};

const paragraphToSlateFormat = (text, redactions) => {
  const editor = createEditor();

  // create a valid initial state with our text
  editor.children = [
    {
      type: "paragraph",
      children: [{ text: text }],
    },
  ];

  redactions.forEach((red, i) => {
    // character distance to the end of the last redaction
    red["distanceToLast"] =
      i == 0 ? red.start : red.start - redactions[i - 1].end;
    // width of this redaction
    red["width"] = red.end - red.start;
  });

  redactions.forEach((red) => {
    // crusty musty dusty but if the path to the last leaf in the editor is [0, x] then we want to get x - 1
    const lastNode = editor.children[0].children.length - 1;

    // set current selection to the range of the redaction
    Transforms.select(editor, {
      // start
      anchor: {
        path: [0, lastNode],
        offset: red.distanceToLast,
      },
      // end
      focus: {
        path: [0, lastNode],
        offset: red.distanceToLast + red.width,
      },
    });
    insertRedaction(editor, SUGGESTION_PREFIX);
  });

  // return the list of text nodes
  return editor.children[0].children;
};
