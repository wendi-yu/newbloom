import { getCommentThreadsOnTextNode } from "@/util/editorCommentUtils";
import { getRedactionsOnTextNode, getMarkFromLeaf } from "@/util/editorRedactionUtils";
import CommentedText from "@/components/document/Comments/CommentedText";
import SuggestedText from "@/components/document/Redactions/SuggestedText";
import RejectedText from "@/components/document/Redactions/RejectedText";
import RedactionPopover from "@/components/document/Redactions/RedactionPopover";
import { changeRedaction, SUGGESTION_PREFIX, ACCEPTED_PREFIX, REJECTED_PREFIX } from "@/util/editorRedactionUtils";

import { useSlate } from "slate-react"
import AcceptedText from "@/components/document/Redactions/AcceptedText";
import CommentPopover from "@/components/document/Comments/CommentPopover";

// for table view, pass in false for  isPopoverDisabled to disable popovers
export default function StyledText({ attributes, children, leaf, isPopoverDisabled }) {

  const mark = getMarkFromLeaf(leaf)
  const editor = useSlate();

  const commentThreads = getCommentThreadsOnTextNode(leaf);

  const popoverComment = (
    <CommentPopover
      text={<span>{children}</span>}
      leaf={leaf}
    />
  )

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

  const popover = (
    <RedactionPopover
      text={<span>{children}</span>}
      onAccept={() => changeRedaction(editor, mark, ACCEPTED_PREFIX)}
      onReject={() => changeRedaction(editor, mark, REJECTED_PREFIX)}
      ifOpen={isPopoverDisabled}
      leaf={leaf}
    />
  )

  const isSuggestion = getRedactionsOnTextNode(leaf, SUGGESTION_PREFIX).size > 0;
  const isRejected = getRedactionsOnTextNode(leaf, REJECTED_PREFIX).size > 0;
  const isAccepted = getRedactionsOnTextNode(leaf, ACCEPTED_PREFIX).size > 0;

  if (isSuggestion) {
    return (
      <SuggestedText
        {...attributes}
      >
        {popover}
      </SuggestedText>
    );
  } else if (isRejected) {
    return (
      <RejectedText
        {...attributes}
      >
        {popover}
      </RejectedText>
    );
  } else if (isAccepted) {
    return (
      <AcceptedText
        {...attributes}
      >
        {popover}
      </AcceptedText>
    );
  }

  return <span {...attributes}>{popoverComment}</span>;
}
