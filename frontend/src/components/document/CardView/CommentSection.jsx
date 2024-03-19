import { Comment } from "./Comment";
import UploadImageIcon from "@/assets/upload_image.svg";

export const CommentSection = ({ comments }) => {
  return (
    <div className="bg-white m-8 mb-0 pb-4 rounded-t-3xl flex flex-col h-1/3 flex-stretch">
      <div className="p-8 pb-0 h-2/5 overflow-y-scroll grow">
        {comments.map((c) => {
          return <Comment key={c.id} comment={c} />;
        })}
      </div>
      <div className="w-full h-14 bg-white flex flex-row justify-between px-4 space-x-2 py-2">
        <img src={UploadImageIcon} className="w-6" />
        <input
          className="w-full bg-gray-200 rounded-2xl p-2"
          placeholder="Aa"
        />
      </div>
    </div>
  );
};
