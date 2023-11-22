const Card = ({ card, idx, total }) => {
    const width = idx / total * 100 || 5
    return <div className="w-3/4 bg-white rounded">
        <div className="bg-primary-light h-2 rounded" style={{ width: width + "%" }} />
        <div className="mt-1 mx-2 text-primary-light">{idx} / {total}</div>
        <div className="m-8 h-80 overflow-auto">{card.text}</div>
    </div>
}

export default Card