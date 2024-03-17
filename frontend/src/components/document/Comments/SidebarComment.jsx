import MenuSVG from "@/assets/meatballs_menu.svg"
import ResolveSVG from "@/assets/resolve_comment.svg"
import ProfileIcon from "@/assets/pfp.svg"

import {commentThreadsState} from "@/util/CommentRedactionState";
import { useRecoilValue } from "recoil";

import { format } from "date-fns";

function SidebarComment ({id}) {

    const { comments } = useRecoilValue(commentThreadsState(id));
    const [firstComment, ...otherComments] = comments;

    const handleResolveComment = () => {
        console.log("resolve")
    }

    const handleClickMenu = () => {
        console.log("menu")
    }

    return (
        <div className="flex flex-col justify-left p-1 bg-white p-5 rounded-2xl min-w-64 focus:shadow-md">
            <div className="flex flex-row justify-between">
                <div className="flex flex-row items-center space-x-2.5 mb-3">
                    <img src={ProfileIcon} alt="Profile Pic" className="h-10"/>
                    <div className="flex flex-col">
                        <p className="font-semibold">{firstComment.author}</p>
                        <p className="font-light">{format(firstComment.creationTime, "MMM dd h:mmaa")}</p>
                    </div>
                </div>
                <div className="flex flex-row space-x-1">
                    <img src={ResolveSVG} alt="Resolve" className="h-5" onClick={handleResolveComment}/>
                    <img src={MenuSVG} alt="Menu" className="h-5" onClick={handleClickMenu}/>
                </div>
            </div>
            {firstComment.text}
        </div>
    );

}

export default SidebarComment