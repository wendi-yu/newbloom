import CheckIcon from "@/assets/check_fill.svg";
import CloseIcon from "@/assets/close_fill.svg";
import CommentIcon from "@/assets/comment_fill.svg";
import NavigateToIcon from "@/assets/navigate_to_icon.svg";
import { Slider } from 'antd';
import { useState } from "react";

const RedactionFilterDropdownMenu = () => {
    //TODO: Some sort of dropdown
    return <div className="w-full text-end font-bold">
        Accepted Suggestions 
    </div>
}

const splitText = (document) => {
    return document.body.children.map((paragraph) => {
        return paragraph.children
    }).flat(1)
}

const parseSentence = (sentence) => {
    const text = sentence.sentence.text
    // Temporarily insert " REDACTED " into the sentence
    return text.slice(0, text.length/2) + " REDACTED " + text.slice(text.length/2)
}

const getWordsFromSentence = (sentence) => {
    return sentence.split(' ')
}

const getRedactedWordIndex = (words) => {
    return words.indexOf("REDACTED")
}

const TableEntry = (sentence) => {
    const parsedSentence = parseSentence(sentence)
    const words = getWordsFromSentence(parsedSentence)
    const redactedWordIndex = getRedactedWordIndex(words)

    const max = Math.max(words.length - redactedWordIndex - 1, redactedWordIndex)
    const min = 0
    const [sentenceLength, setSentenceLength] = useState(0)

    const SentenceWithRedaction = () => {
        //Separate sentence into preRedactedSection, redactedWord, and postRedactedSection
        const ellipsis = '...'
        const wordStartIndex = redactedWordIndex-sentenceLength
        const wordEndIndex = redactedWordIndex+sentenceLength

        const preRedactedSection = words.slice(Math.max(wordStartIndex,0), redactedWordIndex).join(' ')
        const redactedWord = ' ' + words[redactedWordIndex] + ' '
        const postRedactedSection = words.slice(redactedWordIndex + 1, wordEndIndex + 1).join(' ')

        const partsOfSentence = []
        if (wordStartIndex > 0) partsOfSentence.push(ellipsis)
        partsOfSentence.push(preRedactedSection)
        partsOfSentence.push(redactedWord)
        partsOfSentence.push(postRedactedSection)
        if (wordEndIndex < words.length) partsOfSentence.push(ellipsis)

        return <div className="m-2 flex-1 justify-center items-center flex text-center">
            {partsOfSentence}
        </div>
    }
    
    const SentenceVisibilityScale = (props) => {
        return <Slider {...props} onChange={setSentenceLength} value={sentenceLength} className="w-20 m-2 justify-center items-center flex"/>
    }
    
    const TableActionButtons = () => {
        return <div className="flex flex-row p-1">
            <img src={CheckIcon}/>
            <img src={CloseIcon}/>
            <img src={CommentIcon}/>
            <img src={NavigateToIcon}/>
        </div>
    }

    
    return <div className="border border-solid border-slate-100 flex flex-row p-2">
        <SentenceWithRedaction className="m-2"/>
        <SentenceVisibilityScale min={min} max={max}/>
        <TableActionButtons/>
    </div>
}

const TableView = ({ document }) => { 
    const sentences = splitText(document)
    const tableEntries = sentences.map((sentence) => {
        return <div key={sentence}>
            <TableEntry sentence={sentence}/>
        </div>
    })

    return <div className="p-7">
        <RedactionFilterDropdownMenu/>
        <div className="flex flex-col">
            {tableEntries}
        </div>
    </div> 
};

export default TableView;