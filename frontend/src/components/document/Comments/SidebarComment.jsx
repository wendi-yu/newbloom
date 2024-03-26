import ResolveSVG from "@/assets/resolve_comment.svg"
import PurpleResolveSVG from "@/assets/resolve_comment_purple.svg"
import HoverableIcon from "@/components/common/HoverableIcon"
import MenuSVG from "@/assets/meatballs_menu.svg"
import PurpleMenuSVG from "@/assets/meatballs_menu_purple.svg"

import ProfileIcon from "@/assets/pfp.svg"

import CommentResponse from "@/components/document/Comments/CommentResponse"
import CommentChild from "@/components/document/Comments/CommentChild"

import { useRecoilValue } from "recoil";
import { activeCommentThreadIDAtom } from "@/util/CommentRedactionState";
import { useState, useEffect } from "react" 
import { getCommentThreadsOnTextNode } from "@/util/editorCommentUtils";

import { removeSelectedMark } from "@/util/editor_utils"

import { useSlate } from "slate-react";
import { getMarkForCommentThreadID } from "@/util/editorCommentUtils";

import { format } from "date-fns";

function SidebarComment ({id, comment}) {

    const [isViewReply, setIsViewReply] = useState(true)
    const [isFocus, setIsFocus] = useState(false)
    const activeCommentThreadID = useRecoilValue(activeCommentThreadIDAtom);
    const editor = useSlate();

    useEffect (() => {
        if (activeCommentThreadID) {
            const activeCommentMarkSet = getCommentThreadsOnTextNode(activeCommentThreadID);   
            setIsFocus(activeCommentMarkSet.has(id));
        } else {
            setIsFocus(false)
            setIsViewReply(false)
        }
    }, [activeCommentThreadID, id]);

    const handleResolveComment = () => {
        removeSelectedMark(editor, getMarkForCommentThreadID(id));
    }

    //TODO: implement menu
    const handleClickMenu = () => {
    }

    //TODO: for now, you can only focus on comments when you click the corresponding comments
    const handleOnClick = () => {
        // setIsFocus(!isFocus)
        // if (isFocus) {
        //     setActiveCommentThreadID(id);
        //     console.log(activeCommentThreadID)
        // }
    }

    const toggleViewReply = () => {
        setIsViewReply(!isViewReply);
    }

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
    )

    return (
        <div onClick={handleOnClick} className={`flex flex-col bg-none justify-left rounded-2xl ${isFocus ? 'shadow-xl -ml-2.5 transform -translate-x-2.5' : ''}`}>
            <div className={`flex flex-col bg-white p-5 w-64 ${isFocus && isViewReply ? 'rounded-tl-2xl rounded-tr-2xl' : 'rounded-2xl'}`}>
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row items-center space-x-2.5 mb-3">
                        <img src={ProfileIcon} alt="Profile Pic" className="h-10"/>
                        <div className="flex flex-col">
                            <p className="font-semibold">{comment.author}</p>
                            <p className="font-light">{format(new Date(), "MMM dd h:mmaa")}</p>
                        </div>
                    </div>
                {isFocus && menu }
                
                </div>
                {comment.text}
                <div onClick={toggleViewReply}>
                    <p className="text-xs mt-2 font-light text-dark-grey underline decoration-light-gray-background">
                        {isFocus ? (isViewReply ? "Hide Reply" : "View Reply") : ''}
                    </p>
                </div>
            </div>
            {isViewReply && isFocus && 
                <div className="flex flex-col">
                    <CommentChild />
                    <CommentResponse />
                </div>
            }
        </div>
    );

}

export default SidebarComment