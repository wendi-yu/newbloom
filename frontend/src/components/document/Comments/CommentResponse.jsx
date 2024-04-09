import CommentInput from "@/components/document/Comments/CommentInput"
import { useState, useRef, useEffect } from "react";

import { v4 as uuid } from "uuid";
import { getUserById, getCurrentUser } from "@/util/api/user_apis";
import { addCommentToDocument } from "@/util/localDocStore";

import { useParams } from "react-router-dom";
import { DOC_ID_PARAM } from "@/util/constants";

function CommentResponse ({parentId}) {

    const inputRef = useRef(null);
    const userName = getUserById(getCurrentUser());
    const docId = useParams()[DOC_ID_PARAM];

    const [comment, setComment] = useState("");

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    });

    const submitCommentResponse = () => {
        if (comment.length > 0) {
            const newReply = {
              id: uuid(),
              comment: [{
                author: userName,
                text: comment,
                creationTime: new Date().toISOString(),
              }]
            };
            addCommentToDocument(docId, newReply, parentId);
            setComment("");
        }
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