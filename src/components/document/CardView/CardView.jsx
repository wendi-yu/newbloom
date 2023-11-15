import { useState } from "react"
import CardSelector from "./CardSelector"
import Card from "./Card"

// this is a stub, replace it with an API call or something later
const splitText = (text) => {
    return text.body.split('\n\n')
}

const CardView = ({ text }) => {
    const paragraphs = splitText(text)
    const cards = paragraphs.map(par => { return { text: par, completed: false } })
    const [selectedIdx, setSelectedIdx] = useState(0)

    return <div className="h-full w-full">
        <div className="w-80 h-full float-left">
            <CardSelector cards={cards} selectedIdx={selectedIdx} setSelectedIdx={setSelectedIdx} />
        </div>
        <div className="bg-gray-100 w-full h-full ml-80">
            blah
            <Card card={cards[selectedIdx]} />
        </div>
    </div>
}

export default CardView