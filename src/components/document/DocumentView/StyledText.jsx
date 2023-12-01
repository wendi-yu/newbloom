import { getCommentThreadsOnTextNode } from "@/util/editorCommentUtils";
import CommentedText from "./CommentedText";
import RedactionPopover from "../Redaction/RedactionPopover";
import {useState, useEffect, React} from "react";

export default function StyledText({ attributes, children, leaf }) {

  //TO DO: trim space off of highlight
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

