import NodePopover from "./NodePopover";
import { getFirstTextNodeAtSelection } from "../../../../utils/EditorUtils";
import { useEditor } from "slate-react";
import { useSetRecoilState} from "recoil";

import {activeCommentThreadIDAtom} from "../utils/CommentState";

export default function CommentThreadPopover({ editorOffsets, selection, threadID }) {
  const editor = useEditor();
  const textNode = getFirstTextNodeAtSelection(editor, selection);
  const setActiveCommentThreadID = useSetRecoilState(
    activeCommentThreadIDAtom
  );

  const onClickOutside = useCallback(
    () => {},
    []
  );

  return (
    <NodePopover
      editorOffsets={editorOffsets}
      isBodyFullWidth={true}
      node={textNode}
      className={"comment-thread-popover"}
      onClickOutside={onClickOutside}
    >
      {`Comment Thread Popover for threadID:${threadID}`}
      <div className={"comment-list"}>
        {threadData.comments.map((comment, index) => (
          <CommentRow key={`comment_${index}`} comment={comment} />
        ))}
      </div>
    </NodePopover>
  );
}