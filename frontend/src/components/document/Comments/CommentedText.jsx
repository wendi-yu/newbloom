import { activeCommentThreadIDAtom } from "@/util/CommentRedactionState";
import { useRecoilState } from "recoil";
import { ifSelectionInTextNode } from "@/util/editor_utils";

import { useSlate } from "slate-react";
import { useEffect } from "react";

export default function CommentedText(props) {

  const editor = useSlate();
  const { leaf, children, ...otherProps } = props;

  //check if the editor selection is in the comment
  const ifSelectionInLeaf = ifSelectionInTextNode(editor, leaf)

  const [activeCommentThreadID, setActiveCommentThreadID] = useRecoilState(
    activeCommentThreadIDAtom
  );

  useEffect(() => {
    if (ifSelectionInLeaf) {
      setActiveCommentThreadID(leaf);
    } else if (activeCommentThreadID === leaf) {
      setActiveCommentThreadID(null);
    }
  }, [ifSelectionInLeaf, leaf, activeCommentThreadID, setActiveCommentThreadID]);

  const isActive = leaf === activeCommentThreadID;

  return (
    <span
      {...otherProps}
      className={`${ isActive ? 'bg-comment-darker' : 'bg-comment'}`}
    >
      {children}
    </span>
  );
}

