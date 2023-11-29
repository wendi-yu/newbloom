import ProfileIcon from "@/assets/pfp.svg"
import { getUserById } from "@/util/user_apis"
import moment from "moment"

export const Comment = ({ comment, isReply }) => {
    return <div className={`w-full flex flex-row justify-between items-start space-x-4 ${isReply ? "pl-4" : ""}`}>
        <img src={ProfileIcon} className="w-8" />
        <div className="flex flex-col w-full">
            <div>{getUserById(comment.userId).name}</div>
            <div className="text-xs text-slate-400">
                {moment(comment.date).format('h:mm a')}
            </div>
            <div className="pt-4">{comment.body}</div>
            <div className="text-xs text-slate-400 pb-2">Reply</div>
            <div className="w-full h-px bg-slate-400 mb-2" />
            {(!!comment.replies && !!comment.replies.length) &&
                comment.replies.map(reply => {
                    return <Comment key={reply} comment={reply} isReply />
                })
            }
        </div>
    </div>
}