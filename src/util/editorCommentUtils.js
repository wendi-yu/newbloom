import { v4 as uuid } from "uuid";
import { Editor, Node } from 'slate'

// Almost all of this is pulled from the Slate documentation, and a tutorial on adding comments to Slate.
// Reference links here: 
// Slate docs: https://docs.slatejs.org/concepts/01-interfaces
// Tutorial: https://www.smashingmagazine.com/2021/05/commenting-system-wysiwyg-editor/

const COMMENT_THREAD_PREFIX = "commentThread_";

// In this context, a mark is similar to a "bold" or "italic" tag that marks
// a node as having the comment thread corresponding to threadID
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

export function getAllChildCommentThreads(element) {
    const threadIds = {}
    for (const t of Node.texts(element)) {
        // a ratchet set, since the actual one doesn't work very well
        getCommentThreadsOnTextNode(t[0]).forEach(newId => threadIds[newId] = true)
    }
    return threadIds
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