import ResolveSVG from "@/assets/resolve_comment.svg";
import PurpleResolveSVG from "@/assets/resolve_comment_purple.svg";
import HoverableIcon from "@/components/common/HoverableIcon";
import MenuSVG from "@/assets/meatballs_menu.svg";
import PurpleMenuSVG from "@/assets/meatballs_menu_purple.svg";

import ProfileIcon from "@/assets/pfp.svg";

import { useRecoilValue } from "recoil";
import { activeCommentThreadIDAtom } from "@/util/CommentRedactionState";
import { useState, useEffect } from "react";
import { getCommentThreadsOnTextNode } from "@/util/editorCommentUtils";

import { removeSelectedMark } from "@/util/editor_utils";

import { useSlate } from "slate-react";
import { deleteCommentFromDocument } from "@/util/localDocStore";
import { getMarkForCommentThreadID } from "@/util/editorCommentUtils";

import { format, parseISO } from 'date-fns';

function SidebarComment({ id, comment, docId }) {
  const [isFocus, setIsFocus] = useState(false);
  const activeCommentThreadID = useRecoilValue(activeCommentThreadIDAtom);
  const editor = useSlate();

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
    }
  }, [activeCommentThreadID, id]);

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
    <div
      onClick={handleOnClick}
      className={`flex flex-col justify-left p-1 bg-white p-5 rounded-2xl w-64 ${
        isFocus ? "shadow-xl -ml-2.5 transform -translate-x-2.5" : ""
      }`}
    >
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center space-x-2.5 mb-3">
          <img src={ProfileIcon} alt="Profile Pic" className="h-10" />
          <div className="flex flex-col">
            <p className="font-semibold">{comment[0].author.name}</p>
            <p className="font-light">
              {formatCreationTime(comment[0].creationTime)}
            </p>
          </div>
        </div>
        {isFocus && menu}
      </div>
      {comment[0].text}
    </div>
  );
}

export default SidebarComment;
