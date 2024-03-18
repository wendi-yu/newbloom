import MenuSVG from "@/assets/meatballs_menu.svg"
import ResolveSVG from "@/assets/resolve_comment.svg"
import PurpleMenuSVG from "@/assets/meatballs_menu_purple.svg"
import PurpleResolveSVG from "@/assets/resolve_comment_purple.svg"
import HoverableIcon from "@/components/common/HoverableIcon"

import ProfileIcon from "@/assets/pfp.svg"

// import {commentThreadsState} from "@/util/CommentRedactionState";
// import { useRecoilValue } from "recoil";

// import { format } from "date-fns";

function SidebarComment ({id}) {

    // const { comments } = useRecoilValue(commentThreadsState(id));
    // console.log(comments)
    // const [firstComment, ...otherComments] = comments;

    const handleResolveComment = () => {
        console.log("resolve")
        console.log(id)
    }

    const handleClickMenu = () => {
        console.log("menu")
    }

    return (
        <div className="flex flex-col justify-left p-1 bg-white p-5 rounded-2xl min-w-64 focus:shadow-md mb-10">
            <div className="flex flex-row justify-between">
                <div className="flex flex-row items-center space-x-2.5 mb-3">
                    <img src={ProfileIcon} alt="Profile Pic" className="h-10"/>
                    <div className="flex flex-col">
                        <p className="font-semibold">Soliyana</p>
                        <p className="font-light">Apr 17 5:02pm</p>
                        {/* <p className="font-light">{format(creationTime, "MMM dd h:mmaa")}</p> */}
                    </div>
                </div>
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
            </div>
            Should I redact this?
        </div>
    );

}

export default SidebarComment