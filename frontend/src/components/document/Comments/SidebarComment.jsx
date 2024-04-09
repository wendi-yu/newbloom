import ResolveSVG from "@/assets/resolve_comment.svg";
import PurpleResolveSVG from "@/assets/resolve_comment_purple.svg";
import HoverableIcon from "@/components/common/HoverableIcon";
import MenuSVG from "@/assets/meatballs_menu.svg";
import PurpleMenuSVG from "@/assets/meatballs_menu_purple.svg";

import ProfileIcon from "@/assets/pfp.svg";
import CommentResponse from "@/components/document/Comments/CommentResponse"
import CommentChild from "@/components/document/Comments/CommentChild"

import { useRecoilValue } from "recoil";
import { activeCommentThreadIDAtom } from "@/util/CommentRedactionState";
import { useState, useEffect } from "react";
import { getCommentThreadsOnTextNode, getMarkForCommentThreadID } from "@/util/editorCommentUtils";
import { deleteCommentFromDocument } from "@/util/localDocStore";

import { removeSelectedMark } from "@/util/editor_utils";

import { useSlate } from "slate-react";

import { format, parseISO } from 'date-fns';

function SidebarComment({ id, replies, comment, docId}) {

  const [isFocus, setIsFocus] = useState(false);
  const [isViewReply, setIsViewReply] = useState(true)

  const activeCommentThreadID = useRecoilValue(activeCommentThreadIDAtom);
  const editor = useSlate();

  if(replies) console.log(comment, replies)

  const toggleViewReply = () => {
    setIsViewReply(!isViewReply);
  }

  //convert to comment format
  const formatCreationTime = (creationTimeISO) => {
    const date = parseISO(creationTimeISO);
    return format(date, 'MMM dd, yyyy hh:mm aaaa');
  };

  useEffect(() => {
    if (activeCommentThreadID) {
      const activeCommentMarkSet = getCommentThreadsOnTextNode(
        activeCommentThreadID
      );
      setIsFocus(activeCommentMarkSet.has(id));
    } else {
      setIsFocus(false);
      setIsViewReply(false)
    }
  }, [activeCommentThreadID, id, replies]);

  const handleResolveComment = () => {
    removeSelectedMark(editor, getMarkForCommentThreadID(id));
    deleteCommentFromDocument(docId, id);
  };

  //TODO: implement menu
  const handleClickMenu = () => {
  };

  //TODO: for now, you can only focus on comments when you click the corresponding comments
  const handleOnClick = () => {
    // setIsFocus(!isFocus)
    // if (isFocus) {
    //     setActiveCommentThreadID(id);
    //     console.log(activeCommentThreadID)
    // }
  };

  const menu = (
    <div className="flex flex-row space-x-1">
      <HoverableIcon
        SVG={ResolveSVG}
        SVGonHover={PurpleResolveSVG}
        onClick={handleResolveComment}
        height={5}
      />
      <HoverableIcon
        SVG={MenuSVG}
        SVGonHover={PurpleMenuSVG}
        onClick={handleClickMenu}
        height={5}
      />
    </div>
  );

  return (
    <div onClick={handleOnClick} className={`flex flex-col bg-none justify-left rounded-2xl ${isFocus ? 'shadow-xl -ml-2.5 transform -translate-x-2.5' : ''}`}>
        <div className={`flex flex-col bg-white p-5 ${isFocus ? 'rounded-tl-2xl rounded-tr-2xl' : 'rounded-2xl'}`}>
            <div className="flex flex-row justify-between">
                <div className="flex flex-row items-center space-x-2.5 mb-3">
                    <img src={ProfileIcon} alt="Profile Pic" className="h-10"/>
                    <div className="flex flex-col">
                        <p className="font-semibold">{comment[0].author.name}</p>
                        <p className="font-light">
                            {formatCreationTime(comment[0].creationTime)}
                        </p>
                    </div>
                </div>
            {isFocus && menu }
            </div>
            {comment[0].text}
            <div onClick={toggleViewReply}>
                <p className="text-xs mt-2 font-light text-dark-grey underline decoration-light-gray-background">
                    {replies && isFocus ? (
                      isViewReply ? "Hide Reply" : (replies.length>1 ? "View Replies" : "View Reply")) : ''}
                </p>
            </div>
        </div>
        { isFocus &&
            <div className="flex flex-col">
              {isViewReply && replies && replies.map((reply) => (
                <div key={reply.id}>
                  <CommentChild
                    id={reply.id}
                    comment={reply.comment} 
                    docId={docId}
                    />
                </div>

              ))}
              <CommentResponse parentId={id}/>
            </div>
        }
    </div>
  );
}

export default SidebarComment;
