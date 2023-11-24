import { getCommentThreadsOnTextNode } from "../../../utils/editorCommentUtils";
import CommentedText from "./CommentedText";

export default function StyledText({ attributes, children, leaf }) {

    if (leaf.current) {
    }
    
    if (leaf.suggested) {
    }

    if (leaf.redacted) {
    }

    if (leaf.rejected) {
    }

    if (leaf.underline) {
    el = <u>{el}</u>;
    }

    if (leaf.bold) {
        el = <strong>{el}</strong>;
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

  