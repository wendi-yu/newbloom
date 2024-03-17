import SignoutSVG from "@/assets/signout.svg"
import CustomizeSVG from "@/assets/customize_bindings.svg"
import SettingsSVG from "@/assets/settings.svg"

import UserMenuItem from "@/components/common/UserMenu/UserMenuItem"


function UserMenu (width) {

    return (
        <div className="flex flex-col">
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
            />
        </div>
    );

}

export default UserMenu