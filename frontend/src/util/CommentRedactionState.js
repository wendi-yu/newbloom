import { atom, atomFamily } from "recoil";

export const commentThreadsState = atomFamily({
  key: "commentThreads",
  default: [],
});

export const commentThreadIDsState = atom({
  key: "commentThreadIDs",
  default: new Set([]),
});

export const redactionsState = atomFamily({
  key: "redactions",
  default: [],
});

export const redactionIDsState = atom({
  key: "redactionIDs",
  default: new Set([]),
});