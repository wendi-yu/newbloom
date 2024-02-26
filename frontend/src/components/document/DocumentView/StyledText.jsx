import { getCommentThreadsOnTextNode } from "@/util/editorCommentUtils";
import { getRedactionsOnTextNode } from "@/util/editorRedactionUtils";
import CommentedText from "./CommentedText";
import RedactedText from "../Redactions/SuggestedRedaction";
import RedactionPopover from "../Redactions/RedactionPopover";
import {useState, useEffect, React} from "react";

export default function StyledText({ attributes, children, leaf }) {

  const commentThreads = getCommentThreadsOnTextNode(leaf);

  function onRejectRedaction () {

  }

  function onAcceptRedaction () {
    
  }

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

  const redactions = getRedactionsOnTextNode(leaf);
  const [isPopoverVisible, setIsPopoverVisible] = useState(true);

  const handleRedactionClick = () => {
    setIsPopoverVisible(!isPopoverVisible);
  };

  if (redactions.size > 0) {
    return (
      <RedactedText
      {...attributes}
      redactions={redactions}
      textNode={leaf}
      >
        {isPopoverVisible && (
          <RedactionPopover />
        )}
        {children}
      </RedactedText>
    );
  }

  return <span {...attributes}>{children}</span>;
}

  // const [redactionStatus, setRedactionStatus] = useState('');

  // useEffect(() => {
  //   if (leaf.suggested) {
  //     setRedactionStatus('bg-curr-redaction');
  //   }
  // }, [leaf.suggested]);

  // if (leaf.suggested) {
  //   children = (
  //     <RedactionPopover
  //       text={<span className={redactionStatus}>{children}</span>}
  //       onAccept={() => {
  //         setRedactionStatus('bg-accepted-redaction');
  //       }}
  //       onReject={() => {
  //         setRedactionStatus('bg-rejected-redaction underline');
  //       }}
  //     />  
  //   );
  // }

  // if (leaf.current) {
  //   children = <span className="bg-curr-redaction">{children}</span>
  // }

  // if (leaf.suggested) {
  //   children = <span className="bg-suggested-redaction">{children}</span>
  // }

  // if (leaf.accepted) {
  //   children = <span className="bg-accepted-redaction">{children}</span>
  // }