import CommentSVG from "@/assets/comment_fill_gray.svg";
import RedactSVG from "@/assets/edit_fill.svg";
import PrintSVG from "@/assets/print_fill.svg";
import MarkAsDoneSVG from "@/assets/book_check_fill.svg";
import RefreshSVG from "@/assets/refresh.svg";

import UndoSVG from "@/assets/undo.svg";
import RedoSVG from "@/assets/redo.svg";

import PurpleUndoSVG from "@/assets/redo_purple.svg";
import PurpleRedoSVG from "@/assets/undo_purple.svg";

import PurpleCommentSVG from "@/assets/comment_fill_purple.svg";
import PurpleRedactSVG from "@/assets/edit_fill_purple.svg";
import PurplePrintSVG from "@/assets/print_fill_purple.svg";
import PurpleMarkAsDoneSVG from "@/assets/book_check_fill_purple.svg";
import PurpleRefreshSVG from "@/assets/refresh_purple.svg";

import CheckSVG from "@/assets/check_fill.svg";

import { useSlate } from "slate-react";
import { useCallback } from "react";
import { useSetRecoilState } from "recoil";

import HoverableIcon from "@/components/common/HoverableIcon";
import { exportDoc, markAsDone, refresh } from "@/util/toolbar_functions.js";
import { getTextFromSelection } from "@/util/editor_utils";
import { insertMaybeComment } from "@/util/editorCommentUtils";
import { insertRedaction, ACCEPTED_PREFIX } from "@/util/editorRedactionUtils";
import { maybeCommentAtom } from "@/util/CommentRedactionState";
import { notification } from "antd";

export default function Toolbar({ document, onRefresh }) {
  const editor = useSlate();

  const setMaybeComment = useSetRecoilState(maybeCommentAtom);

  const comment = () => {
    const selectedText = getTextFromSelection(editor);
    insertMaybeComment(editor, selectedText, setMaybeComment);
  };

  const redact = useCallback(() => {
    insertRedaction(editor, ACCEPTED_PREFIX);
  }, [editor]);

  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = () => {
    api.open({
      message: "Synced successfully",
      placement: "bottomRight",
      icon: <img src={CheckSVG} />,
    });
  };

  return (
    <div className="flex flex-row bg-gray-200 w-full space-x-6 pl-4 py-2 items-center">
      <div className="flex flex-row space-x-1">
        <HoverableIcon
          SVG={UndoSVG}
          SVGonHover={PurpleUndoSVG}
          onClick={editor.undo}
          height={7}
        />
        <HoverableIcon
          SVG={RedoSVG}
          SVGonHover={PurpleRedoSVG}
          onClick={editor.redo}
          height={7}
        />
      </div>
      <div className="flex flex-row space-x-1">
        <HoverableIcon
          SVG={PrintSVG}
          SVGonHover={PurplePrintSVG}
          onClick={() => exportDoc(document)}
          height={7}
        />
        <HoverableIcon
          SVG={CommentSVG}
          SVGonHover={PurpleCommentSVG}
          onClick={comment}
          height={7}
        />
        <HoverableIcon
          SVG={RedactSVG}
          SVGonHover={PurpleRedactSVG}
          onClick={redact}
          height={7}
        />
        <HoverableIcon
          SVG={MarkAsDoneSVG}
          SVGonHover={PurpleMarkAsDoneSVG}
          onClick={() => {
            markAsDone(document);
            openNotificationWithIcon();
          }}
          height={7}
        />
        <HoverableIcon
          SVG={RefreshSVG}
          SVGonHover={PurpleRefreshSVG}
          onClick={() => {
            refresh(document, onRefresh);
            openNotificationWithIcon();
          }}
          height={7}
        />
        {contextHolder}
      </div>
    </div>
  );
}
