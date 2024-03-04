const ToolbarIcon = ({icon, onClick, ...props}) => {

    return <button 
        className={`flex items-center p-0 bg-transparent border-none focus:outline-none`}
        onClick={onClick}
        {...props}
    >
        {icon}
    </button>
}

export default ToolbarIcon