import { Editable, Slate, withReact } from "slate-react";
import useEditorConfig from "../hooks/useEditorConfig";
import ToolBar from '../components/document/Header/Toolbar';
import CommentsSidebar from "./document/DocumentView/Comments/CommentSidebar";
import useSelection from "../hooks/useSelection";

import { createEditor } from "slate";
import { useMemo, useState, useEffect, useCallback } from "react";

import { activeCommentThreadIDAtom } from "../utils/CommentState";
import { useRecoilValue} from "recoil";

import { initializeStateWithAllCommentThreads } from "../utils/editorCommentUtils";
import useAddCommentThreadCallback from "../hooks/useAddCommentThreadCallback";

export default function TextEditor({ document=[], onChange }){
  const editor = useMemo(() => withReact(createEditor()), []);
  const [selection, setSelection] = useSelection(editor);
  
  const { renderElement, renderLeaf } = useEditorConfig(editor);
  const activeCommentThreadID = useRecoilValue(activeCommentThreadIDAtom);
  const addCommentThread = useAddCommentThreadCallback();

  useEffect(() => {
    initializeStateWithAllCommentThreads(editor, addCommentThread);
  }, [editor, addCommentThread]);

  const onChangeHandler = useCallback(
    (document) => {
      onChange(document);
      setSelection(editor.selection);
    },
    [editor.selection, onChange, setSelection]
  );

  //TODO: styling
  return (
    <div className={"flex flex-col"}>
      <Slate editor={editor} initialValue={document} onChange={onChange}>
        <ToolBar selection={selection} />
        <div className="flex flex-row">
          <div className={"bg-document-background flex justify-center h-full"}>
          <div className={"bg-white w-1/2 bg-grey h-1/3"}>
              <div className={""}>
                {activeCommentThreadID != null ? (
                    <CommentThreadPopover
                      editorOffsets={editorOffsets}
                      selection={selection ?? previousSelection}
                      threadID={activeCommentThreadID}
                    />
                  ) : null}
                <Editable renderElement={renderElement} renderLeaf={renderLeaf} className="flex flex-col" />
              </div>
            </div>
          </div>
          <div className={"h-full min-w-350"}>
            <CommentsSidebar />
          </div>
        </div>
      </Slate>
    </div>
  );
}

function DebugObserver() {
  // see API link above for implementation.
}

