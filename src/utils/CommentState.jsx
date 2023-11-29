import { atom, atomFamily } from "recoil";

export const activeCommentThreadIDAtom = atom({
  key: "activeCommentThreadID",
  default: null,
});

export const commentThreadsState = atomFamily({
  key: "commentThreads",
  default: [],
});

export const commentThreadIDsState = atom({
  key: "commentThreadIDs",
  default: new Set([]),
});