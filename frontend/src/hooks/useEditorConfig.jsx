import StyledText from "@/components/document/DocumentView/StyledText";
import { useCallback } from "react";
import { KeyBindings } from "@/util/editor_utils";
import { insertMaybeComment } from "@/util/editorCommentUtils";

import { getTextFromSelection } from "@/util/editor_utils";

export default function useEditorConfig(editor, setMaybeComment) {
  const onKeyDown = useCallback(
    (event) => {
      // handle add comment
      if (event.key === "d") {
        event.preventDefault();
        const selectedText = getTextFromSelection(editor);
        insertMaybeComment(editor, selectedText, setMaybeComment);
      } else {
        KeyBindings.onKeyDown(editor, event);
      }
    },
    [editor, setMaybeComment]
  );

  return { renderElement, renderLeaf, onKeyDown };
}

function renderElement(props) {
  const { children, attributes } = props;
  return (
    <p {...attributes}>
      {children}
      <br />
      <br />
    </p>
  );
}

function renderLeaf(props) {
  return <StyledText {...props} />;
}
