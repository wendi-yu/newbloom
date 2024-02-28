import {useState} from "react";
import { Popover, ConfigProvider } from "antd";
import CheckIcon from "@/assets/check_fill.svg";
import CloseIcon from "@/assets/close_fill.svg";
import CommentIcon from "@/assets/comment_fill.svg";

export default function RedactionPopover({text, onAccept, onReject}) {

    const [open, setOpen] = useState(false);

    const hide = () => {
        setOpen(false);
    };
    
    function accept() {
        onAccept();
        setOpen(false);
    }

    const reject = () => {
        onReject();
        setOpen(false);
    };

    const content = (
        <div className="flex flex-row">
            <img src={CheckIcon} onClick={accept} className="object-contain h-5 w-5"/>
            <img src={CloseIcon} onClick={reject}  className="object-contain h-5 w-5"/>
            <img src={CommentIcon} onClick={hide}  className="object-contain h-5 w-5"/>
        </div>
    );

    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };

    return (
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
                    {text}
                </Popover>
            </ConfigProvider>
    );

}