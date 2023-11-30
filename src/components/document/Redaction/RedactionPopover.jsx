import {useState, React} from "react";
import { Button, Popover, ConfigProvider } from "antd";
import CheckIcon from "@/assets/check_fill.svg";
import CloseIcon from "@/assets/close_fill.svg";
import CommentIcon from "@/assets/comment_fill.svg";
import { lineHeight } from "@mui/system";

export default function RedactionPopover() {

    const [open, setOpen] = useState(false);

    const hide = () => {
        setOpen(false);
    };

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
        <div style={{ marginTop: 100, marginLeft: 100 }}>
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
                    <Button type="primary">Click me</Button>
                </Popover>
            </ConfigProvider>
        </div>
    );

}