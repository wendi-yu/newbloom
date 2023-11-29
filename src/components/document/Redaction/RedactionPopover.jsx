import {useState, React} from "react";
import { Button, Popover } from "antd";
import CheckIcon from "@/assets/check_fill.svg";
import CloseIcon from "@/assets/close_fill.svg";
import CommentIcon from "@/assets/comment_fill.svg";

export default function RedactionPopover() {

    const [open, setOpen] = useState(false);

    const hide = () => {
        setOpen(false);
    };

    const content = (
        <div className="flex flex-row">
            <img src={CheckIcon} onClick={hide}/>
            <img src={CloseIcon} onClick={hide}/>
            <img src={CommentIcon} onClick={hide}/>
        </div>
    );

    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };

    return (
        <div style={{ marginTop: 100, marginLeft: 100 }}>
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
        </div>
    );

}