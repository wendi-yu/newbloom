import { Comment } from "./Comment"
import UploadImageIcon from "@/assets/upload_image.svg"

export const CommentSection = ({ comments }) => {
    return <div className="bg-white m-8 mb-0 rounded-t-3xl overflow-auto">
        <div className="p-8 pb-0 mb-10">
            {comments.map(c => {
                return <Comment key={c.id} comment={c} />
            })}
        </div>
        <div className="sticky bottom-0 w-full bg-white flex flex-row justify-between px-4 space-x-2 py-2">
            <img src={UploadImageIcon} className="w-6" />
            <input className="w-full bg-gray-200 rounded-2xl p-2" placeholder="Aa" />
        </div>
    </div>
}