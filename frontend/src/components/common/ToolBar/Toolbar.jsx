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
import { activeCommentThreadIDAtom } from "@/util/CommentState"
import useAddRedactionToState from "../../../hooks/useAddRedactionToState"
import { activeRedactionIDAtom} from "../../../util/RedactionState"
import { insertRedaction } from "../../../util/editorRedactionUtils"

export default function Toolbar() {

    const editor = useSlate();

    const addComment = useAddCommentThreadToState();
    const setActiveCommentThreadID = useSetRecoilState(activeCommentThreadIDAtom);
    const comment = useCallback(() => {
        const newCommentThreadID = insertCommentThread(editor, addComment);
        setActiveCommentThreadID(newCommentThreadID);
      }, [editor, addComment, setActiveCommentThreadID]);

    const addRedaction = useAddRedactionToState();
    const setActiveRedactionID = useSetRecoilState(activeRedactionIDAtom);
    const redact = useCallback(() => {
        const newRedactionID = insertRedaction(editor, addRedaction);
        setActiveRedactionID(newRedactionID);
    }, [editor, addRedaction, setActiveRedactionID]);

    const [redactionData, setRedactionData] = useRecoilState(
        RedactionState(threadID)
    );
    
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