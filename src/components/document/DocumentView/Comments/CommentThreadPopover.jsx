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

  const [threadData, setCommentThreadData] = useRecoilState(
    commentThreadsState(threadID)
  );

  const [commentText, setCommentText] = useState("");

  const onCommentTextChange = useCallback(
    (event) => setCommentText(event.target.value),
    [setCommentText]
  );

  const onClick = useCallback(() => {
    setCommentThreadData((threadData) => ({
      ...threadData,
      comments: [
        ...threadData.comments,
        // append comment to the comments on the thread.
        { text: commentText, author: "Jane Doe", creationTime: new Date() },
      ],
    }));
    // clear the input
    setCommentText("");
  }, [commentText, setCommentThreadData]);

  const onClickOutside = useCallback(
      (event) => {
        const slateDOMNode = event.target.hasAttribute("data-slate-node")
          ? event.target
          : event.target.closest('[data-slate-node]');

        // The click event was somewhere outside the Slate hierarchy.
        if (slateDOMNode == null) {
          setActiveCommentThreadID(null);
          return;
        }

        const slateNode = ReactEditor.toSlateNode(editor, slateDOMNode);

        // Click is on another commented text node => do nothing.
        if (
          Text.isText(slateNode) &&
          getCommentThreadsOnTextNode(slateNode).size > 0
        ) {
          return;
        }

        setActiveCommentThreadID(null);
      },
      [editor, setActiveCommentThreadID]
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
      <div className={"comment-input-wrapper"}>
        <Form.Control
          bsPrefix={"comment-input form-control"}
          placeholder={"Type a comment"}
          type="text"
          value={commentText}
          onChange={onCommentTextChange}
        />
        <Button
          size="sm"
          variant="primary"
          disabled={commentText.length === 0}
          onClick={onClick}
        >
          Comment
        </Button>
      </div>
      
    </NodePopover>
  );
}