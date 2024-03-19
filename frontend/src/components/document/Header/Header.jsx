import LogoIcon from "@/assets/new_logo.svg";
// import ShareIcon from "@/assets/share.svg";
// import CommentIcon from "@/assets/comment.svg";
import UserProfile from "@/components/document/Header/UserProfile";
import { useNavigate } from "react-router-dom";

export default function Header({ documentName }) {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/home");
  };

  return (
    <div className="flex h-24 sticky items-center justify-between p-5">
      <div className="flex space-x-4 items-center">
        <img
          src={LogoIcon}
          alt="NewBloom Logo"
          className="h-10 cursor-pointer"
          onClick={handleLogoClick}
        />
        <h2>{documentName}</h2>
      </div>
      <div className="flex space-x-7 items-center">
        {/* <img src={ShareIcon} alt="Share Icon" className="h-9"/>
            <img src={CommentIcon} alt="Comment Icon" className="h-9"/> */}
        <UserProfile />
      </div>
    </div>
  );
}
