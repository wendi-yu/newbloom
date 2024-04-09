import ProfileIcon from "@/assets/pfp.svg"
import { format, parseISO } from 'date-fns';

import ResolveSVG from "@/assets/resolve_comment.svg"
import PurpleResolveSVG from "@/assets/resolve_comment_purple.svg"
import HoverableIcon from "@/components/common/HoverableIcon"
import MenuSVG from "@/assets/meatballs_menu.svg"
import PurpleMenuSVG from "@/assets/meatballs_menu_purple.svg"

import { removeSelectedMark } from "@/util/editor_utils";
import { useSlate } from "slate-react";
import { getMarkForCommentThreadID } from "@/util/editorCommentUtils";
import { deleteCommentFromDocument } from "@/util/localDocStore";

function CommentChild({id, comment, docId}) {

    const editor = useSlate();

    //convert to comment format
    const formatCreationTime = (creationTimeISO) => {
        const date = parseISO(creationTimeISO);
        return format(date, 'MMM dd, yyyy hh:mm aaaa');
    };

    //TODO: resolve child comment
    const handleResolveComment = () => {
        removeSelectedMark(editor, getMarkForCommentThreadID(id));
        deleteCommentFromDocument(docId, id);
    }

    //TODO: implement menu
    const handleClickMenu = () => {
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
        <div className="flex flex-col p-5 bg-white border-t">
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
                {menu}
            </div>
            {comment[0].text}
        </div>

    );
}

export default CommentChild