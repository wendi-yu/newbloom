import CommentInput from "@/components/document/Comments/CommentInput"
import { useState, useRef, useEffect } from "react";

function CommentResponse () {

    const inputRef = useRef(null);
    const [comment, setComment] = useState("");

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    });

    const submitCommentResponse = () => {
    };

    return (
        <div className="flex flex-col p-5 bg-white rounded-bl-2xl rounded-br-2xl border-t">
            <CommentInput
                value={comment}
                handleValueChange={(e) => setComment(e.target.value)}
                submitComment={submitCommentResponse}
                inputRef={inputRef}
                placeholder="Reply"
            />
        </div>

    );
}

export default CommentResponse