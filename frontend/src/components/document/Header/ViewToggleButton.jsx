const ViewToggleButton = ({leadingIcon, trailingIcon, onClick, children, selected, ...props}) => {
    return <button 
        className={`h-10 w-fit ${selected ? "bg-background-primary hover:bg-suggested-redaction" : "bg-gray-100 hover:bg-gray-200"} flex space-x-1.5 items-center rounded-2xl hover:border-none border-none`}
        onClick={onClick}
        {...props}
    >
        {leadingIcon}
        <div>
            {children}
        </div>
        {trailingIcon}
    </button>
}

export default ViewToggleButton