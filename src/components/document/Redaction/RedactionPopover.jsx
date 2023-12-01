import {useState, React} from "react";
import { Popover, ConfigProvider } from "antd";
import CheckIcon from "@/assets/check_fill.svg";
import CloseIcon from "@/assets/close_fill.svg";
import CommentIcon from "@/assets/comment_fill.svg";
import { localeData } from "moment/moment";

export default function RedactionPopover({leaf, text}) {

    const [open, setOpen] = useState(false);

    const hide = () => {
        setOpen(false);
    };

    const accept = () => {
        leaf.current=false;
        leaf.accepted=true;
        setOpen(false);
    };

    const reject = () => {
        leaf.current=false;
        leaf.rejected=true;
        setOpen(false);
    }

    const content = (
        <div className="flex flex-row">
            <img src={CheckIcon} onClick={hide} className="object-contain h-5 w-5"/>
            <img src={CloseIcon} onClick={hide}  className="object-contain h-5 w-5"/>
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