function UserMenuItem ({icon, text, onClick}) {
    return <div
        className="flex flex-row hover:bg-light-gray-background space-x-2 px-3 py-2 hover:text-dark-grey"
        onClick={onClick}
        >
            {icon}
            <p className="font-Inter">
                {text}
            </p>
    </div>
}

export default UserMenuItem