import { activeCommentThreadIDAtom } from "@/util/CommentRedactionState";
import { useRecoilState } from "recoil";

export default function CommentedText(props) {

  const { leaf, children, ...otherProps } = props;

  const [activeCommentThreadID, setActiveCommentThreadID] = useRecoilState(
    activeCommentThreadIDAtom
  );

  const onClick = () => {
    setActiveCommentThreadID(leaf);
  };

  const isActive = leaf === activeCommentThreadID;

  return (
    <span
      {...otherProps}
      className={`${ isActive ? 'bg-comment' : 'bg-comment-darker'}`}
      onClick={onClick}
    >
      {children}
    </span>
  );
}

