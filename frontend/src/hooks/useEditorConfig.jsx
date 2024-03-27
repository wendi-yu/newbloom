import StyledText from "@/components/document/DocumentView/StyledText";
import { useCallback } from "react";
import { KeyBindings } from "@/util/editor_utils";
import { insertMaybeComment } from "@/util/EditorCommentUtils"

import { getTextFromSelection, getMarkRange } from "@/util/editor_utils"
import { maybeCommentRangeAtom } from "@/util/CommentRedactionState"

import { useSetRecoilState } from "recoil";
import { maybeCommentAtom } from "../util/CommentRedactionState";

export default function useEditorConfig(editor, setMaybeComment) {

  const setMaybeCommentRange = useSetRecoilState(maybeCommentRangeAtom);

  const onKeyDown = useCallback(
    (event) => {
      // handle add comment
      if (event.key === "d") {
        event.preventDefault();
        const selectedText = getTextFromSelection(editor);
        insertMaybeComment(editor, selectedText, setMaybeComment)
        const range = getMarkRange(editor);
        setMaybeCommentRange({ ...range, isPopoverRendered: false });
      } else {
        KeyBindings.onKeyDown(editor, event);
      }
    }, [editor, setMaybeComment]
  );

  return { renderElement, renderLeaf, onKeyDown };

}

function renderElement(props) {
  const { children, attributes } = props;
  return <p {...attributes}>{children}</p>;
}

function renderLeaf(props) {
  return <StyledText {...props} />;
}
