import { getCommentThreadsOnTextNode } from "@/util/editorCommentUtils";
import CommentedText from "./CommentedText";
import RedactionPopover from "../Redactions/RedactionPopover";
import {useState, useEffect, React} from "react";

export default function StyledText({ attributes, children, leaf }) {

  const [redactionStatus, setRedactionStatus] = useState('');

  useEffect(() => {
    if (leaf.suggested) {
      setRedactionStatus('bg-curr-redaction');
    }
  }, [leaf.suggested]);

  if (leaf.suggested) {
    children = (
      <RedactionPopover
        text={<span className={redactionStatus}>{children}</span>}
        onAccept={() => {
          setRedactionStatus('bg-accepted-redaction');
        }}
        onReject={() => {
          setRedactionStatus('bg-rejected-redaction underline');
        }}
      />  
    );
  }

  if (leaf.current) {
    children = <span className="bg-curr-redaction">{children}</span>
  }

  if (leaf.suggested) {
    children = <span className="bg-suggested-redaction">{children}</span>
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

