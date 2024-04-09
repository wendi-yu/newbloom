import CheckIcon from "@/assets/check_fill.svg";
import CloseIcon from "@/assets/close_fill.svg";
import NavigateToIcon from "@/assets/navigate_to_icon.svg";
import { Slider } from "antd";
import { useState } from "react";
import {
  ACCEPTED_PREFIX,
  SUGGESTION_PREFIX,
  REJECTED_PREFIX,
} from "@/util/editorRedactionUtils";
import { getTargetFromMark } from "@/util/editorRedactionUtils";
import AcceptedText from "@/components/document/Redactions/AcceptedText";
import RejectedText from "@/components/document/Redactions/RejectedText";
import HighlightedText from "@/components/document/Redactions/HighlightedText";

export const TableEntry = ({
  redaction,
  updateParentState,
  popOutToDocView,
}) => {
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
    const redactedWord = words
      .slice(redacted_start_index, redacted_end_index)
      .join(" ");
    const postRedactedSection = words
      .slice(redacted_end_index + 1, wordEndIndex + 1)
      .join(" ");

    return (
      <div
        className={`m-2 flex-1 justify-center items-center flex text-center`}
      >
        <p>
          {wordStartIndex > 0 && ellipsis}
          {preRedactedSection}{" "}
          {redactionResult === SUGGESTION_PREFIX ? (
            <HighlightedText color={"suggested-redaction"} className="contents">
              {redactedWord}
            </HighlightedText>
          ) : redactionResult === ACCEPTED_PREFIX ? (
            <AcceptedText>{redactedWord}</AcceptedText>
          ) : (
            <RejectedText>{redactedWord}</RejectedText>
          )}{" "}
          {postRedactedSection}
          {wordEndIndex < words.length && ellipsis}
        </p>
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

  const TableActionButtons = ({ onSelect, popOutToDocView }) => {
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
        <img
          src={NavigateToIcon}
          onClick={() => {
            popOutToDocView();
          }}
        />
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
      <SentenceVisibilityScale min={0} max={Math.min(words.length, 30)} />
      <TableActionButtons
        onSelect={updateLocalState}
        popOutToDocView={popOutToDocView}
      />
    </div>
  );
};
