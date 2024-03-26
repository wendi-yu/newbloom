import ResolveSVG from "@/assets/resolve_comment.svg"
import PurpleResolveSVG from "@/assets/resolve_comment_purple.svg"
import HoverableIcon from "@/components/common/HoverableIcon"
// import MenuSVG from "@/assets/meatballs_menu.svg"
// import PurpleMenuSVG from "@/assets/meatballs_menu_purple.svg"

import ProfileIcon from "@/assets/pfp.svg"

import { useRecoilValue } from "recoil";
import { activeCommentThreadIDAtom } from "@/util/CommentRedactionState";
import { useState, useEffect } from "react" 
import { getCommentThreadsOnTextNode } from "@/util/editorCommentUtils";
import { removeSelectedMark } from "@/util/editor_utils"

import { useSlate } from "slate-react";

// import {commentThreadsState} from "@/util/CommentRedactionState";

// import { format } from "date-fns";

function SidebarComment ({id}) {

    const [isFocus, setIsFocus] = useState(false)
    const activeCommentThreadID = useRecoilValue(activeCommentThreadIDAtom);
    const editor=useSlate();

    useEffect (() => {
        if (activeCommentThreadID) {
            const activeCommentMarkSet = getCommentThreadsOnTextNode(activeCommentThreadID);   
            setIsFocus(activeCommentMarkSet.has(id));
        } else {
            setIsFocus(false)
        }
    }, [activeCommentThreadID, id]);

    const handleResolveComment = () => {
        console.log(activeCommentThreadID)
        removeSelectedMark(editor, activeCommentThreadID);
    }

    // TODO: implement menu
    // const handleClickMenu = () => {
    //     console.log("menu")
    // }

    const menu = (
        <div className="flex flex-row space-x-1">
            <HoverableIcon 
                SVG={ResolveSVG}
                SVGonHover={PurpleResolveSVG}
                onClick={handleResolveComment}
                height={5}
            />
            {/* <HoverableIcon 
                SVG={MenuSVG}
                SVGonHover={PurpleMenuSVG}
                onClick={handleClickMenu}
                height={5}
            /> */}
        </div>
    )

    return (
        <div className={`flex flex-col justify-left p-1 bg-white p-5 rounded-2xl w-64 ${isFocus ? 'shadow-xl -ml-2.5 transform -translate-x-2.5' : ''}`}>
            <div className="flex flex-row justify-between">
                <div className="flex flex-row items-center space-x-2.5 mb-3">
                    <img src={ProfileIcon} alt="Profile Pic" className="h-10"/>
                    <div className="flex flex-col">
                        <p className="font-semibold">Soliyana</p>
                        <p className="font-light">Apr 17 5:02pm</p>
                        {/* <p className="font-light">{format(creationTime, "MMM dd h:mmaa")}</p> */}
                    </div>
                </div>
            {isFocus && menu }
            </div>
            Should I redact this?
        </div>
    );

}

export default SidebarComment