import { getCommentThreadsOnTextNode, ifMaybeCommentOnTextNode } from "@/util/editorCommentUtils";
import { getRedactionsOnTextNode, getMarkFromLeaf } from "@/util/editorRedactionUtils";
import { changeRedaction, SUGGESTION_PREFIX, ACCEPTED_PREFIX, REJECTED_PREFIX } from "@/util/editorRedactionUtils";

import { useSlate } from "slate-react"

import RedactionPopover from "@/components/document/Redactions/RedactionPopover";
import CommentPopover from "@/components/document/Comments/CommentPopover";
import HighlightedText from "@/components/document/Redactions/HighlightedText";
import AcceptedText from "@/components/document/Redactions/AcceptedText"
import RejectedText from "@/components/document/Redactions/RejectedText"
import CommentedText from "@/components/document/Comments/CommentedText"

// for table view, pass in false for  isPopoverDisabled to disable popovers
export default function StyledText({ attributes, children, leaf, isPopoverDisabled }) {

  const mark = getMarkFromLeaf(leaf)
  const editor = useSlate();

  //check what marks are on the textnode
  const commentThreads = getCommentThreadsOnTextNode(leaf);
  
  const maybeComment= ifMaybeCommentOnTextNode(leaf);
  const isSuggestion = getRedactionsOnTextNode(leaf, SUGGESTION_PREFIX).size > 0;
  const isRejected = getRedactionsOnTextNode(leaf, REJECTED_PREFIX).size > 0;
  const isAccepted = getRedactionsOnTextNode(leaf, ACCEPTED_PREFIX).size > 0;
  const ifComment = commentThreads.size > 0;

  const isRedaction = isSuggestion || isAccepted || isRejected

  const redactionPopover = (
    <RedactionPopover
      onAccept={() => changeRedaction(editor, mark, ACCEPTED_PREFIX)}
      onReject={() => changeRedaction(editor, mark, REJECTED_PREFIX)}
      ifOpen={true}
      leaf={leaf}
      text={<span>{children}</span>}
     />
  )

  //only modify content if it has a popover
  let content = <span>{children}</span>
  if (maybeComment && isRedaction) {
    console.log("Rendering CommentPopover with redactionPopover");
    content = <CommentPopover ifOpen={true} text={redactionPopover} />
  } else if (maybeComment) {
    console.log("Rendering CommentPopover");
    content = <CommentPopover ifOpen={true} text={<span>{children}</span>} />
  } else if (isRedaction) {
    console.log("Rendering redactionPopover");
    content=redactionPopover
  }

  if (isSuggestion) {
    const color = (maybeComment || ifComment) ? "suggestion-and-comment" : "suggested-redaction";
    return (
      <HighlightedText color={color} {...attributes}>
        {content}
      </HighlightedText>
    );
    
  } else if (isRejected) {
    const color = (maybeComment || ifComment) ? "comment" : "transparent";
    console.log(color)
    return (
      <RejectedText
        {...attributes}
        color={color}
      >
        {content}
      </RejectedText>
    );

  } else if (isAccepted) {
    const color = (maybeComment || ifComment) ? "comment" : "transparent";
    return (
      <AcceptedText 
        {...attributes}
        color={color}
      >
        {content}
      </AcceptedText>
    );
  } else if (maybeComment || ifComment) {
    return (
      <CommentedText 
        {...attributes}
      >
        {content}
      </CommentedText>
    )

  } 

  return <span {...attributes}>{children}</span>;
}
