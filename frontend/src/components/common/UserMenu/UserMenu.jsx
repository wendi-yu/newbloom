import SignoutSVG from "@/assets/signout.svg"
import CustomizeSVG from "@/assets/customize_bindings.svg"
import SettingsSVG from "@/assets/settings.svg"

import UserMenuItem from "@/components/common/UserMenu/UserMenuItem"
import { Popover, ConfigProvider } from "antd"

function UserMenu () {

    return (
        <div>
            <ConfigProvider
            theme={{
                token: {
                    padding: 0,
                    paddingSM: 0,
                    boxShadowSecondary: ""
                },
            }}
            >
                <Popover
                    content={content}
                    trigger="click"
                    open={open}
                    onOpenChange={handleOpenChange}
                    placement="topRight"
                    arrow={false}
                    style={{padding:0, paddingSM:0}}
                >
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
                </Popover>
            </ConfigProvider>
        </div>
    );

}

export default UserMenu