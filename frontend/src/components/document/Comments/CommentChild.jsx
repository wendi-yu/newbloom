import ProfileIcon from "@/assets/pfp.svg"
import {format} from "date-fns"

import ResolveSVG from "@/assets/resolve_comment.svg"
import PurpleResolveSVG from "@/assets/resolve_comment_purple.svg"
import HoverableIcon from "@/components/common/HoverableIcon"
import MenuSVG from "@/assets/meatballs_menu.svg"
import PurpleMenuSVG from "@/assets/meatballs_menu_purple.svg"

function CommentChild() {

    //TODO: resolve child comment
    const handleResolveComment = () => {
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
                        <p className="font-semibold">Soliyana</p>
                        <p className="font-light">{format(new Date(), "MMM dd h:mmaa")}</p>
                    </div>
                </div>
                {menu}
            </div>
            Nevermind
        </div>

    );
}

export default CommentChild