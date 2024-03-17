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
  const editor = createEditor();

  editor.children = [
    {
      type: "paragraph",
      children: [{ text: text }],
    },
  ];

  const redactionsOrdered = redactions.sort((a, b) => a.start - b.start);

  redactionsOrdered.forEach((red, i) => {
    red["distanceToLast"] =
      i == 0 ? red.start : red.start - redactionsOrdered[i - 1].end;
    red["width"] = red.end - red.start;
  });

  redactionsOrdered.forEach((red) => {
    // crusty musty dusty but if the path to the last leaf in the editor is [0, x] then we want to get x - 1
    const lastNode = editor.children[0].children.length - 1;

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

  return editor.children;
};
