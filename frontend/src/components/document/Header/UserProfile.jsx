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
    
    return <div className="flex items-center">
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
                <div className="flex flex-row items-center justify-center space-x-2.5">
                    <img src={ProfileIcon} alt="Profile Pic" className="h-10" />
                    <h4 className="font-semibold text-dark-grey">Soliyana</h4>
                </div>
            </Popover>
        </ConfigProvider>
    </div>
}

export default UserProfile;