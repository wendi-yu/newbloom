import { Editable, Slate, withReact } from "slate-react";
import useEditorConfig from "@/hooks/useEditorConfig";

import { createEditor } from "slate";
import { useEffect, useRef } from "react";
import { withHistory } from "slate-history";
import { useSetRecoilState } from "recoil";

import Toolbar from "@/components/common/ToolBar/Toolbar";

import { initializeStateWithAllCommentThreads } from "@/util/editorCommentUtils";
import useAddCommentThreadToState from "@/hooks/useAddCommentThreadToState";
import { maybeCommentAtom } from "@/util/CommentRedactionState";
import localDocStore from "@/util/localDocStore";

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

  useEffect(() => {
    initializeStateWithAllCommentThreads(editor, addCommentThread);
  }, [editor, addCommentThread]);

  const onChange = (value) => {
    updateDocumentState({ ...document, documentBody: value });

    const isMeaningfulChange = editor.operations.some(
      (op) => "set_selection" !== op.type
    );
    // ignore selections
    if (!isMeaningfulChange) {
      return;
    }

    localDocStore.updateDocumentBody(document.id, value);
  };

  return (
    <div className="flex flex-col h-full">
      <Slate
        editor={editor}
        initialValue={document.documentBody}
        onChange={onChange}
      >
        <Toolbar />
        <div className="bg-document-background min-h-full flex flex-row justify-center">
          <div className=" mx-40 max-w-4xl max-h-[900px] overflow-y-scroll">
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
      </Slate>
    </div>
  );
}
