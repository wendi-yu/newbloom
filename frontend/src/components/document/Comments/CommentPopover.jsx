import ProfileIcon from "@/assets/pfp.svg"
import CommentInput from "@/components/document/Comments/CommentInput";

import { useSlate } from "slate-react"
import  {useState, useCallback } from "react"
import { Popover } from "antd"

import { insertCommentThread, deleteMaybeComment } from "@/util/EditorCommentUtils"
import useAddCommentThreadToState from "@/hooks/useAddCommentThreadToState";

function CommentPopover ({text}) {

    const [comment, setComment] = useState('');

    const [open, setOpen] = useState(true);
    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
        if (!newOpen) {
            deleteMaybeComment(editor);
        }
    };

    const editor = useSlate();
    const addComment = useAddCommentThreadToState();

    const insertComment = useCallback(() => {
        insertCommentThread(editor, addComment);
        deleteMaybeComment(editor);
    }, [editor, addComment]);

    const submitComment = () => {
        if (comment.length>0) {
            insertComment();
            setOpen(false);
            setComment('');
        }
    }

    const content = (
        <div className="flex flex-col justify-left p-1">
            <div className="flex flex-row items-center space-x-2 mb-3">
                <img src={ProfileIcon} alt="Profile Pic" className="h-7"/>
                <p className="font-semibold">Soliyana</p>
            </div>

            <CommentInput
                value={comment}
                handleValueChange = {(e)=>setComment(e.target.value)}
                submitComment = {submitComment}
            />
        </div>
    );

    return (
        <Popover
            content={content}
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
            placement="bottom"
            arrow={false}
            style={{padding:0, paddingSM:0, zIndex: 9999}}
        >
            {text}
        </Popover>
    );

}

export default CommentPopover