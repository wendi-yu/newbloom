import { v4 as uuid } from "uuid";
import { Editor } from 'slate'

const COMMENT_THREAD_PREFIX = "commentThread_";

export function getMarkForCommentThreadID(threadID) {
    return `${COMMENT_THREAD_PREFIX}${threadID}`;
}

export function getCommentThreadsOnTextNode(textnode) {
    return new Set(
        Object.keys(textnode)
            .filter(isCommentThreadIDMark)
            .map(getCommentThreadIDFromMark)
    );
}

export function getCommentThreadIDFromMark(mark) {
    if (!isCommentThreadIDMark(mark)) {
        throw new Error("Expected mark to be of a comment thread");
    }
    return mark.replace(COMMENT_THREAD_PREFIX, "");
}

function isCommentThreadIDMark(mayBeCommentThread) {
    return mayBeCommentThread.indexOf(COMMENT_THREAD_PREFIX) === 0;
}

export function insertCommentThread(editor, addCommentThreadToState) {
    const threadID = uuid();
    const newCommentThread = {
        // comments as added would be appended to the thread here.
        comments: [],
        creationTime: new Date(),
        // Newly created comment threads are OPEN. We deal with statuses
        // later in the article.
        status: "open",
    };
    addCommentThreadToState(threadID, newCommentThread);
    Editor.addMark(editor, getMarkForCommentThreadID(threadID), true);
    return threadID;
}