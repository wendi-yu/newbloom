import SignoutSVG from "@/assets/signout.svg"
import CustomizeSVG from "@/assets/customize_bindings.svg"
import SettingsSVG from "@/assets/settings.svg"

import UserMenuItem from "@/components/common/UserMenu/UserMenuItem"
import { useNavigate } from 'react-router-dom';

//add width prop
function UserMenu () {

    const navigate = useNavigate();

    const signout = () => {
        navigate('/login')
    }

    return (
        <div className="flex flex-col ">
            <UserMenuItem
                icon={<img src={SettingsSVG}/>}
                text="Settings"
            />
            <UserMenuItem
                icon={<img src={CustomizeSVG}/>}
                text="Customize Bindings"
            />
            <UserMenuItem
                icon={<img src={SignoutSVG}/>}
                text="Sign Out"
                onClick={signout}
            />
        </div>
    );

}

export default UserMenu