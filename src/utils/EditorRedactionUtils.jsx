const REDACTION_THREAD_PREFIX = "redactionThread_";

export function getMarkForRedactionThreadID(threadID) {
  return `${REDACTION_THREAD_PREFIX}${threadID}`;
}

export function getRedactionThreadsOnTextNode(textNode) {
    return new Set(
       // Because marks are just properties on nodes,
      // we can simply use Object.keys() here.
      Object.keys(textNode)
        .filter(isRedactionThreadIDMark)
        .map(getRedactionThreadIDFromMark)
    );
  }
  
  export function getRedactionThreadIDFromMark(mark) {
    if (!isRedactionThreadIDMark(mark)) {
      throw new Error("Expected mark to be of a Redaction thread");
    }
    return mark.replace(REDACTION_THREAD_PREFIX, "");
  }
  
  function isRedactionThreadIDMark(mayBeRedactionThread) {
    return mayBeRedactionThread.indexOf(REDACTION_THREAD_PREFIX) === 0;
  }