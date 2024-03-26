import CheckIcon from "@/assets/check_fill.svg";
import CloseIcon from "@/assets/close_fill.svg";
import CommentIcon from "@/assets/comment_fill.svg";
import NavigateToIcon from "@/assets/navigate_to_icon.svg";
import { Slider } from "antd";
import { useState } from "react";
import {
  ACCEPTED_PREFIX,
  SUGGESTION_PREFIX,
  REJECTED_PREFIX,
} from "@/util/editorRedactionUtils";
import { getTargetFromMark } from "@/util/editorRedactionUtils";

export const TableEntry = ({ redaction, updateParentState }) => {
  let paragraph_index = redaction;
  let words = paragraph_index.paragraph;
  let redacted_index = paragraph_index.index;
  let redacted_start_index = redacted_index.start_index;
  let redacted_end_index = redacted_index.end_index;
  const [sentenceLength, setSentenceLength] = useState(0);

  const [redactionResult, setRedactionResult] = useState(
    getTargetFromMark(redaction.index.mark || SUGGESTION_PREFIX)
  );

  const updateLocalState = (newEntryStatus) => {
    setRedactionResult(newEntryStatus);
    updateParentState(redaction.index.mark, newEntryStatus);
  };

  const SentenceWithRedaction = () => {
    //Separate sentence into preRedactedSection, redactedWord, and postRedactedSection
    const ellipsis = "...";
    const wordStartIndex = redacted_start_index - sentenceLength;
    const wordEndIndex = redacted_end_index + sentenceLength;

    const preRedactedSection = words
      .slice(Math.max(wordStartIndex, 0), redacted_start_index)
      .join(" ");
    const redactedWord =
      " <" +
      words.slice(redacted_start_index, redacted_end_index).join(" ") +
      "> ";
    const postRedactedSection = words
      .slice(redacted_end_index + 1, wordEndIndex + 1)
      .join(" ");

    const partsOfSentence = [];
    if (wordStartIndex > 0) partsOfSentence.push(ellipsis);
    partsOfSentence.push(preRedactedSection);
    partsOfSentence.push(redactedWord);
    partsOfSentence.push(postRedactedSection);
    if (wordEndIndex < words.length) partsOfSentence.push(ellipsis);

    return (
      <div
        className={`m-2 flex-1 justify-center items-center flex text-center ${
          redactionResult === SUGGESTION_PREFIX ? "opacity-100" : "opacity-30"
        }`}
      >
        {partsOfSentence}
      </div>
    );
  };

  const SentenceVisibilityScale = (props) => {
    return (
      <Slider
        {...props}
        onChange={setSentenceLength}
        value={sentenceLength}
        className="w-20 m-2 justify-center items-center flex"
      />
    );
  };

  const TableActionButtons = ({ onSelect }) => {
    return (
      <div className="flex flex-row p-1">
        <img
          className={
            redactionResult == ACCEPTED_PREFIX ? "opacity-30" : "opacity-100"
          }
          src={CheckIcon}
          onClick={() => {
            onSelect(
              redactionResult === ACCEPTED_PREFIX
                ? SUGGESTION_PREFIX
                : ACCEPTED_PREFIX
            );
          }}
        />
        <img
          className={
            redactionResult === REJECTED_PREFIX ? "opacity-30" : "opacity-100"
          }
          src={CloseIcon}
          onClick={() => {
            onSelect(
              redactionResult === REJECTED_PREFIX
                ? SUGGESTION_PREFIX
                : REJECTED_PREFIX
            );
          }}
        />
        <img src={CommentIcon} />
        <img src={NavigateToIcon} />
      </div>
    );
  };

  return (
    <div
      className={`border border-solid border-slate-100 flex flex-row p-2 ${
        redactionResult === SUGGESTION_PREFIX ? "opacity-100" : "opacity-70"
      }`}
    >
      <SentenceWithRedaction className="m-2" />
      <SentenceVisibilityScale min={0} max={words.length} />
      <TableActionButtons onSelect={updateLocalState} />
    </div>
  );
};
