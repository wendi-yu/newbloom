import ProfileIcon from "@/assets/pfp.svg"

const UserProfile = () => {
    // This is a fill in component.
    // TODO: fill out this functionality (with contexts, whatever) once we have login/authentication
    return <div className="flex items-center space-x-2.5">
        <img src={ProfileIcon} alt="Profile Pic" className="h-10"/>
        <h4>Soliyana</h4>
    </div>
}

export default UserProfile;