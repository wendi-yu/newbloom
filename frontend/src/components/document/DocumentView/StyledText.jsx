import { getCommentThreadsOnTextNode } from "@/util/editorCommentUtils";
import { getRedactionsOnTextNode, getMarkFromLeaf, replaceRedactionWithX } from "@/util/editorRedactionUtils";
import CommentedText from "./CommentedText";
import RedactedText from "../Redactions/RedactedText";
import RedactionPopover from "../Redactions/RedactionPopover";
import { accepted, rejected } from "@/assets/redacted_lists";

import { useSlate } from "slate-react"

//for table view, pass in false for  isPopoverDisabled to disable popovers
export default function StyledText({ attributes, children, leaf, isPopoverDisabled }) {

  const mark = getMarkFromLeaf(leaf)
  const editor = useSlate();

  //this stuff is wrong
  function removeMark () {  
    leaf[mark] = false
    editor.removeMark(mark)
    console.log(leaf)
  }
  //store and send to ML model
  function onRejectRedaction () {
    removeMark()
    rejected.push(leaf)
  }

  //store and send to ML model
  function onAcceptRedaction () {
    replaceRedactionWithX(leaf)
    accepted.push(leaf)
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
