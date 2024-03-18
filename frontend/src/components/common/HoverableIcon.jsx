import { useState } from "react"

function HoverableIcon ({SVG, SVGonHover, onClick, height}) {

    const [isHover, setIsHover] = useState(false);

    return (
        <div
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <button 
                className={`flex items-center p-0 bg-transparent border-none focus:outline-none`}
                onClick={onClick}
            >
                <img
                    src={isHover ? SVGonHover : SVG}
                    alt="Icon"
                    className={`h-${height}`}
                />
            </button>
        </div>
    );
} 
export default HoverableIcon