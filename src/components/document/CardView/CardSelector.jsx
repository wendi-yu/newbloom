import { toText } from "@/util/slateUtil"

const CardSelector = ({ cards, selectedIdx, setSelectedIdx }) => {

    return <div className="bg-white h-full w-full p-4 overflow-y-scroll">
        {cards.map((card, idx) => {
            const bgColor = idx == selectedIdx ? "bg-background-primary" : "bg-white"
            const textColor = card.completed ? "text-slate-500" : "text-black"
            const hover = "hover:border-primary-light hover:border"
            return <button
                key={idx}
                className={`flex h-10 w-full items-center space-x-2 border-white ${bgColor} ${textColor} ${hover}`}
                onClick={(e) => {
                    setSelectedIdx(idx)
                    e.currentTarget.blur()
                }}>
                <div>{idx + 1}.</div>
                <div className="truncate">{toText(card.text)}</div>
            </button>
        })}
    </div>
}

export default CardSelector