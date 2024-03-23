import { isRedaction } from "@/util/editorRedactionUtils";
import CheckIcon from "@/assets/check_fill.svg";
import CloseIcon from "@/assets/close_fill.svg";
import CommentIcon from "@/assets/comment_fill.svg";
import NavigateToIcon from "@/assets/navigate_to_icon.svg";
import { Slider } from 'antd';
import { useState } from "react";

const RedactionFilterDropdownMenu = () => {
    //TODO: Some sort of dropdown
    return <div className="w-full text-end font-bold p-2">
        Accepted Suggestions
    </div>
}

const TableEntry = (redaction) => {
    var paragraph_index = redaction.redaction
    var words = paragraph_index.paragraph
    var redacted_index = paragraph_index.index
    var redacted_start_index = redacted_index.start_index 
    var redacted_end_index = redacted_index.end_index
    const [sentenceLength, setSentenceLength] = useState(0)

    const Result = {
        InReview: "InReview",
        Approved: "Approved",
        Rejected: "Rejected",
    }
    const [redactionResult, setRedactionResult] = useState(Result.InReview)

    const SentenceWithRedaction = () => {
        //Separate sentence into preRedactedSection, redactedWord, and postRedactedSection
        const ellipsis = '...'
        const wordStartIndex = redacted_start_index - sentenceLength
        const wordEndIndex = redacted_end_index + sentenceLength

        const preRedactedSection = words.slice(Math.max(wordStartIndex, 0), redacted_start_index).join(' ')
        const redactedWord = ' <' + words.slice(redacted_start_index, redacted_end_index).join(' ') + '> '
        const postRedactedSection = words.slice(redacted_end_index + 1, wordEndIndex + 1).join(' ')

        const partsOfSentence = []
        if (wordStartIndex > 0) partsOfSentence.push(ellipsis)
        partsOfSentence.push(preRedactedSection)
        partsOfSentence.push(redactedWord)
        partsOfSentence.push(postRedactedSection)
        if (wordEndIndex < words.length) partsOfSentence.push(ellipsis)

        return <div className={`m-2 flex-1 justify-center items-center flex text-center ${redactionResult === Result.InReview ? "opacity-100" : "opacity-30"}`}>
            {partsOfSentence}
        </div>
    }

    const SentenceVisibilityScale = (props) => {
        return <Slider {...props} onChange={setSentenceLength} value={sentenceLength} className="w-20 m-2 justify-center items-center flex" />
    }

    const TableActionButtons = () => {
        return <div className="flex flex-row p-1">
            <img
                className={redactionResult == Result.Approved ? "opacity-30" : "opacity-100"}
                src={CheckIcon}
                onClick={() => { setRedactionResult(redactionResult === Result.Approved ? Result.InReview : Result.Approved) }} />
            <img
                className={redactionResult === Result.Rejected ? "opacity-30" : "opacity-100"}
                src={CloseIcon}
                onClick={() => { setRedactionResult(redactionResult === Result.Rejected ? Result.InReview : Result.Rejected) }} />
            <img src={CommentIcon} />
            <img src={NavigateToIcon} />
        </div>
    }

    return <div className={`border border-solid border-slate-100 flex flex-row p-2 ${redactionResult === Result.InReview ? 'opacity-100' : 'opacity-70'}`}>
        <SentenceWithRedaction className="m-2" />
        <SentenceVisibilityScale min={0} max={words.length} />
        <TableActionButtons />
    </div>
}

const TableView = ({ document }) => {
    /*We're going to map each redaction to a tuple (paragraph, indexes)
    paragraph: A string of the paragraph
    indexes: (start_index, end_index) of redaction
    */
    const paragraph_index_list = document.documentBody.map((paragraph) => {
        const paragraph_words = paragraph.children.map((child) => child.text).flat(1).join("").split(" ")
        var curr_word_index = 0
        const paragraph_index = []
        paragraph.children.forEach((child) => {
            if (isRedaction(child)) {
                const index = {
                    start_index: curr_word_index,
                    end_index: curr_word_index + child.text.split(" ").length,
                }
                paragraph_index.push({
                    paragraph: paragraph_words,
                    index: index,
                })
            }
            curr_word_index += child.text.split(" ").length-1
        })

        return paragraph_index
    })

    const tableEntries = []
    paragraph_index_list.forEach((paragraph_index, i) => {
        paragraph_index.forEach((redaction, j) => {
            tableEntries.push(
                <div key={100 * i + j}>
                <TableEntry redaction={redaction} />
            </div>
            ) 
        })
    })

    return <div className="p-7">
        <RedactionFilterDropdownMenu />
        <div className="flex flex-col">
            {tableEntries}
        </div>
    </div>
};

export default TableView;