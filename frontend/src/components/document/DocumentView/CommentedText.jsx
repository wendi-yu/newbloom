import classNames from "classnames";

import { activeCommentThreadIDAtom } from "@/util/CommentState";
import { getCommentThreadsOnTextNode } from "@/util/editorCommentUtils";
import { useRecoilState } from "recoil";

export default function CommentedText(props) {
  const { commentThreads, textnode, ...otherProps } = props;

  const [activeCommentThreadID, setActiveCommentThreadID] = useRecoilState(
    activeCommentThreadIDAtom
  );

  const onClick = () => {
    setActiveCommentThreadID(
      getCommentThreadsOnTextNode(textnode)
    );
  };

  const commentStyle = {
    backgroundColor: '#feeab5',
  };

  return (
    <span
      {...otherProps}
      className={classNames({
        comment: true,
        "is-active": commentThreads.has(activeCommentThreadID),
      })}
      style={commentStyle}
      onClick={onClick}
    >
      {props.children}
    </span>
  );
}

