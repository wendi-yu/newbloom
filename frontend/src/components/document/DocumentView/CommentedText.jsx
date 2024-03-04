import classNames from "classnames";

import { activeThreadIDAtom } from "@/util/CommentRedactionState";
import { getCommentThreadsOnTextNode } from "@/util/editorCommentUtils";
import { useRecoilState } from "recoil";

export default function CommentedText(props) {
  const { commentThreads, textnode, ...otherProps } = props;

  const [activeThreadID, setActiveThreadID] = useRecoilState(
    activeThreadIDAtom
  );

  const onClick = () => {
    setActiveThreadID(
      getCommentThreadsOnTextNode(textnode)
    );
  };

  const commentStyle = {
    backgroundColor: '#feeab5',
  };

  return (
    <span
      className={classNames({
        comment: true,
        "is-active": commentThreads.has(activeThreadID),
      })}
      style={commentStyle}
      onClick={onClick}
    >
      {props.children}
    </span>
  );
}

