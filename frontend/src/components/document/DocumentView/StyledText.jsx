import { getCommentThreadsOnTextNode } from "@/util/editorCommentUtils";
import { getRedactionsOnTextNode, getMarkFromLeaf } from "@/util/editorRedactionUtils";
import CommentedText from "./CommentedText";
import RedactedText from "../Redactions/RedactedText";
import RedactionPopover from "../Redactions/RedactionPopover";
import { accepted, rejected } from "@/assets/redacted_lists";
import useEditorConfig from "@/hooks/useEditorConfig";
import { removeRedaction } from "@/util/editorRedactionUtils";

import { useSlate } from "slate-react"

//for table view, pass in false for  isPopoverDisabled to disable popovers
export default function StyledText({ attributes, children, leaf, isPopoverDisabled }) {

  const mark = getMarkFromLeaf(leaf)
  const editor = useSlate();

  const { renderLeaf } = useEditorConfig(editor);

  let ifBgColor = true
  let redactionColor = "bg-suggested-redaction"

  //this stuff is wrong
  function removeMark () {  
    removeRedaction(editor, mark)
  }
  //store and send to ML model
  function onRejectRedaction () {
    removeMark()
    rejected.push(leaf)
    leaf.underline=true;
  }

  //store and send to ML model
  function onAcceptRedaction () {
    redactionColor="bg-accepted-redaction"
    console.log(leaf)
    renderLeaf()
    accepted.push(leaf)
  }

  if (leaf.underline) {
    return <u>{children}</u>
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
      bgColor={redactionColor}
      ifBgColor={ifBgColor}
      >
        {children}
      </RedactedText>
    );
  }

  return <span {...attributes}>{children}</span>;
}
