import {
    redactionIDsState,
    redactionsState,
  } from "@/util/CommentRedactionState";
  
  import { useRecoilCallback } from "recoil";
  
  //call this to add a new redaction
  export default function useAddRedactionToState() {
    console.log(redactionIDsState)
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
        console.log('Removing redaction with ID:', id);
        set(redactionIDsState, (ids) => {
          console.log('Current redaction IDs:', ids);
          const filteredIds = Array.from(ids).filter(item => item !== id);
          console.log('New redaction IDs:', filteredIds);
          return new Set(filteredIds);
        });
  
        if (id) {
          console.log('Setting redaction with ID to undefined:', id);
          set(redactionsState(id), undefined);
        }
      },
      []
    );
  }
  