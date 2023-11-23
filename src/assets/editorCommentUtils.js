const COMMENT_THREAD_PREFIX = "commentThread_";

export function getMarkForCommentThreadID(threadID) {
  return `${COMMENT_THREAD_PREFIX}${threadID}`;
}