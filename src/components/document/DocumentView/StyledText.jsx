import { getCommentThreadsOnTextNode } from "../../../utils/editorCommentUtils";
import CommentedText from "./CommentedText";

export default function StyledText({ attributes, children, leaf }) {

    if (leaf.current) {
      e1=<div className="bg-curr-redaction">{e1}</div>
    }
    
    if (leaf.suggested) {
      e1=<div className="bg-suggested-redaction">{e1}</div>
    }

    if (leaf.accepted) {
      e1=<div className="bg-accepted-redaction">{e1}</div>
    }

    if (leaf.rejected) {
      e1=<div className="bg-rejected-redaction">{e1}</div>
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

  