import { atom, atomFamily } from "recoil";

export const commentThreadsState = atomFamily({
  key: "commentThreads",
  default: [],
});

export const commentThreadIDsState = atom({
  key: "commentThreadIDs",
  default: new Set([]),
});

//stores the comment that is currently being selected
export const activeCommentThreadIDAtom = atom({
  key: "activeCommentThreadID",
  default: null,
});

export const redactionsState = atomFamily({
  key: "redactions",
  default: [],
});

export const redactionIDsState = atom({
  key: "redactionIDs",
  default: new Set([]),
});

// maybe comment is the comment that may be commented before the comment gets inserted
export const maybeCommentAtom = atom({
  key: "maybeComment",
  default: null,
});