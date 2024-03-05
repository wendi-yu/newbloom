import { getCommentThreadsOnTextNode } from "@/util/editorCommentUtils";
import { getRedactionsOnTextNode, getMarkFromLeaf } from "@/util/editorRedactionUtils";
import CommentedText from "@/components/document/DocumentView/CommentedText";
import RedactedText from "@/components/document/Redactions/RedactedText";
import RedactionPopover from "@/components/document/Redactions/RedactionPopover";

//for table view, pass in false for  isPopoverDisabled to disable popovers
export default function StyledText({ attributes, children, leaf, isPopoverDisabled }) {

  const mark = getMarkFromLeaf(leaf)

  function onRejectRedaction () {
  }

  function onAcceptRedaction () {
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

  const redactions = getRedactionsOnTextNode(leaf);

  if (redactions.size > 0 && leaf[mark]) {
    children = (
      <RedactionPopover
        text={<span>{children}</span>}
        onAccept={onAcceptRedaction}
        onReject={onRejectRedaction}
        ifOpen={isPopoverDisabled}
        leaf={leaf}
      />  
    );

    return (
      <RedactedText
      {...attributes}
      redactions={redactions}
      textnode={leaf}
      >
        {children}
      </RedactedText>
    );
  }

  return <span {...attributes}>{children}</span>;
}
