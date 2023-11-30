import { getCommentThreadsOnTextNode } from "@/util/editorCommentUtils";
import CommentedText from "./CommentedText";
import RedactionPopover from "../Redaction/RedactionPopover";

export default function StyledText({ attributes, children, leaf }) {

  //TO DO: trim space off of highlight

  if (leaf.current) {
    children = <RedactionPopover leaf={leaf} text={<span className="bg-curr-redaction">{children}</span>} />
  }

  if (leaf.suggested) {
    children = <RedactionPopover leaf={leaf} text={<span className="bg-suggested-redaction">{children}</span>} />
  }

  if (leaf.accepted) {
    children = <span className="bg-accepted-redaction">{children}</span>
  }

  if (leaf.rejected) {
    children = <u>{children}</u>
  }

  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  const commentThreads = getCommentThreadsOnTextNode(leaf);

  if (commentThreads.size > 0) {
    return (
      <CommentedText
        {...attributes}
        commentThreads={commentThreads}
        textnode={leaf}
      >
        {children}
      </CommentedText>
    );
  }

  return <span {...attributes}>{children}</span>;
}

