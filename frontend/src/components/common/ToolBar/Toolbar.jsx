import CommentSVG from "@/assets/comment_fill_gray.svg"
import RedactSVG from "@/assets/edit_fill.svg"
import PrintSVG from "@/assets/print_fill.svg"
import MarkAsDoneSVG from "@/assets/book_check_fill.svg"
import UndoSVG from "@/assets/undo.svg"
import RedoSVG from "@/assets/redo.svg"

import {useSlate} from "slate-react"
import {useSetRecoilState, useRecoilState } from "recoil"
import {useCallback} from "react"

import ToolbarIcon from "@/components/common/Toolbar/ToolbarIcon"

import {print, markAsDone, undo, redo} from "@/util/toolbar_functions.js"

import { insertCommentThread } from "@/util/EditorCommentUtils"
import useAddCommentThreadToState from "@/hooks/useAddCommentThreadToState";
import { activeThreadIDAtom } from "@/util/CommentRedactionState"
import useAddRedactionToState from "@/hooks/useAddRedactionToState"
import { insertRedaction } from "@/util/editorRedactionUtils"

export default function Toolbar() {
    const editor = useSlate();
    const setActiveThreadID = useSetRecoilState(activeThreadIDAtom);

    const addComment = useAddCommentThreadToState();
    
    const comment = useCallback(() => {
        const newCommentThreadID = insertCommentThread(editor, addComment);
        setActiveThreadID(newCommentThreadID);
      }, [editor, addComment, setActiveThreadID]);

    const addRedaction = useAddRedactionToState();

    const redact = useCallback(() => {
        const newRedactionID = insertRedaction(editor, addRedaction);
        setActiveThreadID(newRedactionID);

        const [redactionData, setRedactionData] = useRecoilState(
            redactionsState(newRedactionID)
        );


    }, [editor, addRedaction, setActiveThreadID]);




    
    return (
        <div className="flex flex-row bg-gray-200 h-10 w-full space-x-6 pl-4">
            <div className="flex flex-row space-x-1">
                <ToolbarIcon 
                    icon={<img src={UndoSVG} />}
                    onClick={undo}
                />
                <ToolbarIcon 
                    icon={<img src={RedoSVG} />}
                    onClick={redo}
                /> 
            </div>
            <div className="flex flex-row space-x-1">
                <ToolbarIcon 
                    icon={<img src={PrintSVG} />}
                    onClick={print}
                /> 
                <ToolbarIcon 
                    icon={<img src={CommentSVG} />}
                    
                    onMouseDown={comment}
                />
                <ToolbarIcon 
                    icon={<img src={RedactSVG} />}
                    onClick={redact}
                /> 
                <ToolbarIcon 
                    icon={<img src={MarkAsDoneSVG} />}
                    onClick={markAsDone}
                /> 
            </div>
        </div>
    );
  }