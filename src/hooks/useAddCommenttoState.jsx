import {
  commentThreadIDsState,
  commentThreadsState,
} from "@/util/CommentState";

import { useRecoilCallback } from "recoil";

export default function useAddCommentThreadToState() {
  return useRecoilCallback(
    ({ set }) => (id, threadData) => {
      set(commentThreadIDsState, (ids) => new Set([...Array.from(ids), id]));
      set(commentThreadsState(id), threadData);
    },
    []
  );
}