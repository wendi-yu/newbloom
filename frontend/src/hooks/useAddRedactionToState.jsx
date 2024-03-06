import {
    redactionIDsState,
    redactionsState,
  } from "@/util/CommentRedactionState";
  
  import { useRecoilCallback } from "recoil";
  
 //adds redaction to state, 
  export default function useAddRedactionToState() {
    return useRecoilCallback(
      ({ set }) => (id, threadData) => {
        set(redactionIDsState, (ids) => new Set([...Array.from(ids), id]));
        set(redactionsState(id), threadData);
      },
      []
    );
  }

  export default function useRemoveRedactionFromState(mark) {
    return useRecoilCallback(
      ({ set }) => (id) => {
        set(redactionIDsState, (ids) => new Set([...ids].filter(item => item !== id)));
        id && set(redactionsState(id), undefined);
      },
      []
      
    );
  }
  