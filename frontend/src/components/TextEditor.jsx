import { Editable, Slate, withReact } from "slate-react";
import useEditorConfig from "@/hooks/useEditorConfig";

import { createEditor } from "slate";
import { useEffect, useRef, useState } from "react";
import { withHistory } from "slate-history";
import { useSetRecoilState } from "recoil";

import Toolbar from "@/components/common/ToolBar/Toolbar";
import CommentSideBar from "@/components/document/Comments/CommentSideBar";

import { initializeStateWithAllCommentThreads } from "@/util/editorCommentUtils";
import useAddCommentThreadToState from "@/hooks/useAddCommentThreadToState";
import { maybeCommentAtom } from "@/util/CommentRedactionState";
import localDocStore from "@/util/localDocStore";

import { useParams } from "react-router-dom";
import { DOC_ID_PARAM } from "@/util/constants";

export default function TextEditor({
  document = { documentBody: [] },
  updateDocumentState,
}) {
  // workaround to make the editor behave properly with vite hot reloading
  const editorRef = useRef();
  if (!editorRef.current)
    editorRef.current = withReact(withHistory(createEditor()));
  const editor = editorRef.current;

  const addCommentThread = useAddCommentThreadToState();
  const setMaybeComment = useSetRecoilState(maybeCommentAtom);
  const { renderElement, renderLeaf, onKeyDown } = useEditorConfig(
    editor,
    setMaybeComment
  );

  const docId = useParams()[DOC_ID_PARAM];

  const [commentRefresh, setCommentRefresh] = useState(false);
  useEffect(() => {
    initializeStateWithAllCommentThreads(editor, addCommentThread, docId);
  }, [editor, addCommentThread, docId]);

  const onDocChange = (newVal, externalChange = false) => {
    updateDocumentState({ ...document, documentBody: newVal });

    setCommentRefresh(!commentRefresh);
    localDocStore.updateDocumentBody(document.id, newVal);

    if (externalChange) editor.children = newVal;
  };

  const onSlateChange = (value) => {
    const isMeaningfulChange = editor.operations.some(
      (op) => "set_selection" !== op.type
    );
    // ignore selections
    if (!isMeaningfulChange) {
      return;
    }
    onDocChange(value);
  };

  return (
    <div className="flex flex-col h-full">
      <Slate
        editor={editor}
        initialValue={document.documentBody}
        onChange={onSlateChange}
      >
        <Toolbar
          document={document}
          onRefresh={(val) => {
            onDocChange(val, true);
            setCommentRefresh(!commentRefresh);
          }}
        />
        <div className="bg-document-background min-h-full justify-center">
          <div className="overflow-y-scroll flex flex-row">
            <div className="ml-72 mr-10 max-w-4xl max-h-[1200px]">
              <div className="mt-20 bg-white">
                <Editable
                  renderElement={renderElement}
                  onKeyDown={onKeyDown}
                  renderLeaf={renderLeaf}
                  className="flex flex-col p-16 focus:outline-none max-h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </Slate>
    </div>
  );
}
