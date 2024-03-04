import {
    redactionIDsState,
    redactionsState,
  } from "@/util/CommentRedactionState";
  
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

//   export default function useRemoveRedactionFromState() {
//     return useRecoilCallback(
//       ({ set }) => (id) => {
//         set(redactionIDsState, (ids) => new Set([...Array.from(ids).filter(item => item !== id)]));
//         set(redactionsState(id), undefined);
//       },
//       []
//     );
//   }