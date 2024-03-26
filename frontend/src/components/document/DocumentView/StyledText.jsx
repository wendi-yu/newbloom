import { getCommentThreadsOnTextNode, ifMaybeCommentOnTextNode } from "@/util/editorCommentUtils";
import { getRedactionsOnTextNode, getMarkFromLeaf } from "@/util/editorRedactionUtils";
import { changeRedaction, SUGGESTION_PREFIX, ACCEPTED_PREFIX, REJECTED_PREFIX } from "@/util/editorRedactionUtils";
import { ifSelectionInTextNode } from "@/util/editor_utils";
import { activeCommentThreadIDAtom } from "@/util/CommentRedactionState";

import { useSlate } from "slate-react"
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";

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
  const [color, setColor] = useState('transparent'); 

  //check what marks are on the textnode
  const commentThreads = getCommentThreadsOnTextNode(leaf);
  
  const maybeComment= ifMaybeCommentOnTextNode(leaf);
  const isSuggestion = getRedactionsOnTextNode(leaf, SUGGESTION_PREFIX).size > 0;
  const isRejected = getRedactionsOnTextNode(leaf, REJECTED_PREFIX).size > 0;
  const isAccepted = getRedactionsOnTextNode(leaf, ACCEPTED_PREFIX).size > 0;
  const isComment = commentThreads.size > 0;

  const isRedaction = isSuggestion || isAccepted || isRejected
  const isCommentLike = maybeComment || isComment

  //check if the editor selection is in the comment
  const ifSelectionInLeaf = ifSelectionInTextNode(editor, leaf) && isComment

  const [activeCommentThreadID, setActiveCommentThreadID] = useRecoilState(
    activeCommentThreadIDAtom
  );

  useEffect(() => {
    if (ifSelectionInLeaf) {
      setActiveCommentThreadID(leaf);
    } else if (activeCommentThreadID === leaf) {
      // if selection isn't in leaf, set active comment thread to null
      setActiveCommentThreadID(null);
    }
  }, [ifSelectionInLeaf, leaf, activeCommentThreadID, setActiveCommentThreadID]);

  const isActive = leaf === activeCommentThreadID;

  useEffect(() => {
    let newColor = 'transparent';
    // renders normal redaction styling if there isn't a comment
    if (isSuggestion) {
      newColor = isActive ? 'suggestion-and-comment-darker' : (isCommentLike ? 'suggestion-and-comment' : 'suggested-redaction');
    } else if (isRejected || isAccepted) {
        newColor = isActive ? 'comment-darker' : (isCommentLike ? 'comment' : 'transparent');
    }
    setColor(newColor); 
  }, [activeCommentThreadID, isActive, isCommentLike, isSuggestion, isRejected, isAccepted]);

  const redactionPopover = (
    <RedactionPopover
      onAccept={() => changeRedaction(editor, mark, ACCEPTED_PREFIX)}
      onReject={() => changeRedaction(editor, mark, REJECTED_PREFIX)}
      ifOpen={isPopoverDisabled}
      leaf={leaf}
      text={<span>{children}</span>}
     />
  )

  //only modify content if it has a popover
  let textContent = isRedaction ? redactionPopover : <span>{children}</span>;
  const content = maybeComment ? <CommentPopover ifOpen={true} text={textContent} /> : textContent;

  if (isSuggestion) {
    return (
      <HighlightedText
        color={color}
        {...attributes}
      >
        {content}
      </HighlightedText>
    );
    
  } else if (isRejected) {
    return (
      <RejectedText
        {...attributes}
        color={color}
      >
        {content}
      </RejectedText>
    );

  } else if (isAccepted) {
    return (
      <AcceptedText 
        {...attributes}
        color={color}
      >
        {content}
      </AcceptedText>
    );
  } else if (isCommentLike) {
    return (
      <CommentedText 
        {...attributes}
        leaf = {leaf}
        isActive={isActive}
      >
        {content}
      </CommentedText>
    )

  } 

  return <span {...attributes}>{children}</span>;
}
