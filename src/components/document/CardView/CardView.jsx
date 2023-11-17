import { useState } from "react"
import CardSelector from "./CardSelector"
import Card from "./Card"
import CheckIcon from "@/assets/check_ring.svg";
import CloseIcon from "@/assets/close_ring.svg";
import NextIcon from "@/assets/next.svg";
import PreviousIcon from "@/assets/previous.svg";

// this is a stub, replace it with an API call or something later
const splitText = (text) => {
    return text.body.split('\n\n')
}

const CardView = ({ text }) => {
    const paragraphs = splitText(text)
    const [cards, setCards] = useState(paragraphs.map(par => { return { text: par, completed: false } }))
    const [selectedIdx, setSelectedIdx] = useState(0)

    const getNextIncomplete = () => {
        for (let i = 1; i < cards.length + 1; ++i) {
            const newIdx = (selectedIdx + i) % cards.length
            if (!cards[newIdx].completed) return newIdx
        }
        return (selectedIdx + 1) % cards.length
    }

    return <div className="h-full w-full">
        <div className="w-80 h-full float-left">
            <CardSelector cards={cards} selectedIdx={selectedIdx} setSelectedIdx={setSelectedIdx} />
        </div>
        <div className="bg-gray-100 h-full ml-80 px-8 flex flex-col justify-items-stretch">
            <div className="flex justify-end p-4 mb-8">
                {cards[selectedIdx].completed ?
                    <button
                        className="bg-success opacity-75 flex space-x-2 text-white items-center border-warning hover:border-white"
                        onClick={(e) => {
                            cards[selectedIdx].completed = false
                            setCards(cards)
                            e.currentTarget.blur()
                            // TODO: fix this, make it stay on the same card but refresh the display state of this button??
                            setSelectedIdx(getNextIncomplete())
                        }}
                    >
                        <img src={CloseIcon} />
                        <div>Re-mark for review</div>
                    </button>
                    :
                    <button
                        className="bg-success flex space-x-2 text-white items-center border-success hover:border-white"
                        onClick={(e) => {
                            cards[selectedIdx].completed = true
                            setCards(cards)
                            e.currentTarget.blur()
                            setSelectedIdx(getNextIncomplete())
                        }}
                    >
                        <img src={CheckIcon} />
                        <div>Mark as Reviewed</div>
                    </button>
                }
            </div>
            <div className="p-6 flex space-x-2 items-center ">
                <button
                    className="p-2 w-1/8 bg-white"
                    onClick={(e) => {
                        // js doesn't have a mod operator, do this to make sure we don't get a negative index
                        setSelectedIdx((selectedIdx + cards.length - 1) % cards.length)
                        e.currentTarget.blur()
                    }}
                >
                    <img src={PreviousIcon} />
                </button>
                <Card card={cards[selectedIdx]} idx={selectedIdx} total={cards.length} />
                <button
                    className="p-2 w-1/8 bg-white"
                    onClick={(e) => {
                        setSelectedIdx((selectedIdx + 1) % cards.length)
                        e.currentTarget.blur()
                    }}
                >
                    <img src={NextIcon} />
                </button>
            </div>
            <div className="bg-white m-8 p-8 mb-0 pb0 rounded-t-3xl grow">
                comments
            </div>
        </div>
    </div>
}

export default CardView