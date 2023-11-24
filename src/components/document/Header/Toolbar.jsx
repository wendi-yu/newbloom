import useAddCommentThreadToState from "../../../hooks/useAddCommenttoState";
import { useCallback } from "react";
import { useEditor } from "slate-react";
import { useSetRecoilState } from "recoil";
import CommentIcon from "@/assets/add_comment.svg";

export default function Toolbar({selection, previousSelection}) {

    const editor = useEditor();
    //const setActiveCommentThreadID = useSetRecoilState(activeCommentThreadIDAtom);
    const addCommentThread = useAddCommentThreadToState();

    const onInsertComment = useCallback(() => {
      const newCommentThreadID = insertCommentThread(editor, addCommentThread);
    }, [editor, addCommentThread]);

    return <div className='bg-gray-200 h-10'>
    
    <ToolBarButton
        isActive={false}
        //disabled={!shouldAllowNewCommentThreadAtSelection(editor, selection)}
        label={<i className={`bi ${getIconForButton("comment")}`} />}
        onMouseDown={onInsertComment}
    />
    </div>
}

function getIconForButton(style) {
    switch (style) {
      case "comment":
        return "bi-card-text";
      default:
        throw new Error(`Unhandled style in getIconForButton: ${style}`);
    }
  }

  function ToolBarButton(props) {
    return (
        <img src={CommentIcon} />
    );
  }