import { isRedaction } from "@/util/editorRedactionUtils";

import { getMarkFromLeaf } from "@/util/editorRedactionUtils";
import { TableEntry } from "./TableEntry";
import { createEditor } from "slate";
import { changeRedaction, getAllRedactions } from "@/util/editorRedactionUtils";
import { selectNode } from "@/util/editor_utils";
import localDocStore from "@/util/localDocStore";
import { useCallback, useState } from "react";

const RedactionFilterDropdownMenu = () => {
  //TODO: Some sort of dropdown
  return (
    <div className="w-full text-end font-bold p-2">Accepted Suggestions</div>
  );
};

const TableView = ({ document }) => {
  /*We're going to map each redaction to a tuple (paragraph, indexes)
    paragraph: A string of the paragraph
    indexes: (start_index, end_index) of redaction
    */
  const [documentBody, setDocumentBody] = useState(document.documentBody);
  const paragraph_index_list = documentBody.map((paragraph) => {
    const paragraph_words = paragraph.children
      .map((child) => child.text)
      .flat(1)
      .join("")
      .split(" ");
    let curr_word_index = 0;
    const paragraph_index = [];
    paragraph.children.forEach((child) => {
      if (isRedaction(child)) {
        const index = {
          mark: getMarkFromLeaf(child),
          start_index: curr_word_index,
          end_index: curr_word_index + child.text.split(" ").length,
        };
        paragraph_index.push({
          paragraph: paragraph_words,
          index: index,
        });
      }
      curr_word_index += child.text.split(" ").length - 1;
    });

    return paragraph_index;
  });

  const updateLocalState = (mark, target) => {
    const editor = createEditor();
    editor.children = document.documentBody;

    const redactions = getAllRedactions(editor);
    const ourRedaction = redactions.filter(
      (red) => getMarkFromLeaf(red.node) === mark
    );

    selectNode(editor, ourRedaction[0]);
    changeRedaction(editor, mark, target);

    setDocumentBody(editor.children);
    localDocStore.updateDocumentBody(document.id, editor.children);
  };

  const tableEntries = paragraph_index_list.map((paragraph_index, i) => {
    return paragraph_index.map((redaction, j) => {
      return (
        <div key={100 * i + j}>
          <TableEntry
            redaction={redaction}
            updateParentState={updateLocalState}
          />
        </div>
      );
    });
  });

  return (
    <div className="p-7">
      <RedactionFilterDropdownMenu />
      <div className="flex flex-col">{tableEntries}</div>
    </div>
  );
};

export default TableView;
