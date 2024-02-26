import {
    redactionIDsState,
    redactionsState,
  } from "../utils/CommentState";
  
  import { useRecoilCallback } from "recoil";
  
  //call this to add a new redaction
  export default function useAddRedactionToState() {
    return useRecoilCallback(
      ({ set }) => (id, threadData) => {
        set(redactionIDsState, (ids) => new Set([...Array.from(ids), id]));
        set(redactionsState(id), threadData);
      },
      []
    );
  }