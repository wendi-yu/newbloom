// Bare-bones clickable that has accessibility features of the <button> class without the unwanted default styling
const Clickable = (props) => {
    // janky way of not overwriting the className styling
    const propsCopy = { className: "", ...props }
    delete propsCopy.className
    const classNameString = (props.className ? props.className : "") + " p-0 border-0 hover:border-0 focus:outline-none font-normal rounded-none"
    return <button className={classNameString} {...propsCopy}>
        {props.children}
    </button >
}

export default Clickable