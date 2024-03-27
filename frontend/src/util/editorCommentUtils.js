import { v4 as uuid } from "uuid";
import { Editor, Node } from 'slate';
import { getUserById, getCurrentUser } from "@/util/api/user_apis";

import docApi from "@/util/api/document_apis";

const COMMENT_THREAD_PREFIX = "commentThread_";
const MAYBE_COMMENT = "isMaybeComment";

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

export function ifCommentThreadsEqual(node1, node2) {
    // TODO: find a better way to check for equality
    if (!node1 || !node2) return false;
    if (node1.size !== node2.size) return false;
    return node1.text == node2.text ? true : false;
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

export function insertMaybeComment (editor, selectedText, setMaybeComment) {
    setMaybeComment(selectedText);

    Editor.addMark(editor, MAYBE_COMMENT, true);
}

export function ifMaybeCommentOnTextNode(textnode) {
    const keys = Object.keys(textnode)

    if (keys.some(key => key === MAYBE_COMMENT)) {
        return true;
    }
    
    return false;
}

//selection must be on mark to delete maybe comment
//will hopefully change this in next pr (active comments)
export function deleteMaybeComment(editor, setMaybeComment, setMaybeCommentRange) {
    Editor.removeMark(editor, MAYBE_COMMENT);
    setMaybeComment(null);
    setMaybeCommentRange(null);
}

export function insertCommentThread(editor, addCommentThreadToState) {
    const threadID = uuid();
    const user = getUserById(getCurrentUser());
    const newCommentThread = {
        // comments as added would be appended to the thread here.
        comments: [],
        creationTime: new Date(),
        // Newly created comment threads are OPEN. We deal with statuses
        // later in the article.
        author: user.name,
        status: "open",
    };
    addCommentThreadToState(threadID, newCommentThread);
    Editor.addMark(editor, getMarkForCommentThreadID(threadID), true);
    
    return threadID;
}

export async function initializeStateWithAllCommentThreads(docId, addCommentThread ) {
    const doc = docApi.getDocById(docId);

    if(!doc || !doc.comments) {
        console.log("Document doesn't exist or has no comments.");
        return;
    }

    doc.comments.forEach(comment => {
        addCommentThread(comment.id, {
            comments: [comment],
            status: "open"
        });
    })
    
}