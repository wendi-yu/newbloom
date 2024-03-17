import CommentSVG from "@/assets/comment_fill_gray.svg"
import RedactSVG from "@/assets/edit_fill.svg"
import PrintSVG from "@/assets/print_fill.svg"
import MarkAsDoneSVG from "@/assets/book_check_fill.svg"
import UndoSVG from "@/assets/undo.svg"
import RedoSVG from "@/assets/redo.svg"

import { useSlate } from "slate-react"
import { useCallback } from "react"

import ToolbarIcon from "@/components/common/Toolbar/ToolbarIcon"

import { print, markAsDone} from "@/util/toolbar_functions.js"
import { insertRedaction, ACCEPTED_PREFIX } from "@/util/editorRedactionUtils"

export default function Toolbar() {
    const editor = useSlate();

    const comment = () => {
        //TODO: Popup comment popover
        console.log("comment")
    };

    const redact = useCallback(() => {
        insertRedaction(editor, ACCEPTED_PREFIX);
    }, [editor]);

    return (
        <div className="flex flex-row bg-gray-200 h-10 w-full space-x-6 pl-4">
            <div className="flex flex-row space-x-1">
                <ToolbarIcon
                    icon={<img src={UndoSVG} />}
                    onClick={editor.undo}
                />
                <ToolbarIcon
                    icon={<img src={RedoSVG} />}
                    onClick={editor.redo}
                />
            </div>
            <div className="flex flex-row space-x-1">
                <ToolbarIcon
                    icon={<img src={PrintSVG} />}
                    onClick={print}
                />
                <ToolbarIcon
                    icon={<img src={CommentSVG} />}

                    onMouseDown={comment}
                />
                <ToolbarIcon
                    icon={<img src={RedactSVG} />}
                    onClick={redact}
                />
                <ToolbarIcon
                    icon={<img src={MarkAsDoneSVG} />}
                    onClick={markAsDone}
                />
            </div>
        </div>
    );
}