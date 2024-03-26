import ProfileIcon from "@/assets/pfp.svg";
import CommentInput from "@/components/document/Comments/CommentInput";

import { useSlate } from "slate-react";
import { Transforms } from "slate";
import { useState, useRef, useEffect } from "react";
import { Popover } from "antd";

import {
  insertCommentThread,
  deleteMaybeComment,
} from "@/util/EditorCommentUtils";
import useAddCommentThreadToState from "@/hooks/useAddCommentThreadToState";
import { maybeCommentAtom } from "@/util/CommentRedactionState";
import { useSetRecoilState } from "recoil";

import { addCommentToDocument } from "@/util/localDocStore";
import { getUserById, getCurrentUser } from "@/util/api/user_apis";
import { useParams } from "react-router-dom";
import { DOC_ID_PARAM } from "@/util/constants";

function CommentPopover({ text}) {
  const inputRef = useRef(null);
  const user = getUserById(getCurrentUser());
  const docId = useParams()[DOC_ID_PARAM];

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const [comment, setComment] = useState("");
  const setMaybeComment = useSetRecoilState(maybeCommentAtom);
  //const setActiveCommentThreadID = useSetRecoilState(activeCommentThreadIDAtom);

  const [open, setOpen] = useState(true);
  const editor = useSlate();
  const addComment = useAddCommentThreadToState();

  const userName = getUserById(getCurrentUser());

  const deleteComment = () => {
    setComment("");
    deleteMaybeComment(editor, setMaybeComment);
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
    if (!newOpen) {
      deleteComment();
      Transforms.deselect(editor);
    }
  };

  const submitComment = () => {
    if (comment.length > 0) {
      const newCommentThreadID = insertCommentThread(editor, addComment);
      deleteMaybeComment(editor, setMaybeComment);
      setOpen(false);

      const newComment = {
        id: newCommentThreadID,
        comment: [{
          author: userName,
          text: comment,
          creationTime: new Date().toISOString(),
        }]
      };
      addCommentToDocument(docId, newComment);
    }
  };

  const handleEscapePress = (event) => {
    if (event.key === "Escape") {
      deleteComment();
      Transforms.deselect(editor);
      setOpen(false);
    }
  };

  const content = (
    <div
      className="flex flex-col justify-left p-1"
      onKeyDown={handleEscapePress}
      tabIndex={0}
    >
      <div className="flex flex-row items-center space-x-2 mb-3">
        <img src={ProfileIcon} alt="Profile Pic" className="h-7" />
        <p className="font-semibold">{user.name}</p>
      </div>

      <CommentInput
        value={comment}
        handleValueChange={(e) => setComment(e.target.value)}
        submitComment={submitComment}
        inputRef={inputRef}
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
      style={{ padding: 0, paddingSM: 0, zIndex: 9999 }}
    >
      {text}
    </Popover>
  );
}

export default CommentPopover;
