function UserMenuItem ({icon, text, onClick}) {

    return <div
        className="flex flex-row hover:bg-light-gray-background space-x-2 px-3 py-2"
        onClick={onClick}
        >
            {icon}
            <p className="text-B1B1B1 hover:text-dark-grey">
                {text}
            </p>
    </div>

}

export default UserMenuItem