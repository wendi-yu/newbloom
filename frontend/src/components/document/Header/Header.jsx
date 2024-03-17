import LogoIcon from "@/assets/logo.svg";
// import ShareIcon from "@/assets/share.svg";
// import CommentIcon from "@/assets/comment.svg";
import UserProfile from "@/components/document/Header/UserProfile";

export default function Header({ documentName }) {
    return <div className="flex h-24 sticky items-center justify-between p-7">
        <div className="flex space-x-4 items-center">
            <img src={LogoIcon} alt="NewBloom Logo" className="h-10"/>
            <h2>{documentName}</h2>
        </div>
        <div className="flex space-x-7 items-center">
            {/* <img src={ShareIcon} alt="Share Icon" className="h-9"/>
            <img src={CommentIcon} alt="Comment Icon" className="h-9"/> */}
            <UserProfile />
        </div>
    </div>
}