const COMMENT_THREAD_PREFIX = "commentThread_";

export function getMarkForCommentThreadID(threadID) {
  return `${COMMENT_THREAD_PREFIX}${threadID}`;
}

export function getCommentThreadsOnTextNode(textNode) {
  return new Set(
    Object.keys(textNode)
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