import ProfileIcon from "@/assets/pfp.svg"
import UserMenu from "@/components/common/UserMenu/UserMenu"
import { Popover, ConfigProvider } from "antd"
import { useState } from "react"

// This is a fill in component.
// TODO: fill out this functionality (with contexts, whatever) once we have login/authentication
const UserProfile = () => {

    const [open, setOpen] = useState(false);

    const content = ( <UserMenu /> );
    
    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };
    
    return <div className="flex items-center space-x-2.5">
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
                    <img src={ProfileIcon} alt="Profile Pic" className="h-10" />
                </Popover>
            </ConfigProvider>
        <h4>Soliyana</h4>
    </div>
}

export default UserProfile;