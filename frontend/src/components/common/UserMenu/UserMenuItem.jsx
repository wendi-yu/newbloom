function UserMenuItem ({icon, text, onClick}) {

    return <div className="flex flex-row " onClick={onClick}>
        {icon}
        {text}
    </div>

}

export default UserMenuItem