import { atom, atomFamily } from "recoil";

export const redactionsState = atomFamily({
  key: "redactions",
  default: [],
});

export const redactionIDsState = atom({
  key: "redactionIDs",
  default: new Set([]),
});