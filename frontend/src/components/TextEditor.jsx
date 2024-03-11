import { Editable, Slate, withReact } from "slate-react";
import useEditorConfig from "@/hooks/useEditorConfig";

import { createEditor } from "slate";
import { useEffect, useRef } from "react";
import { withHistory } from "slate-history";

import Toolbar from "@/components/common/Toolbar/Toolbar"

import { initializeStateWithAllCommentThreads } from "@/util/editorCommentUtils";
import { hotkeys } from "@/util/editor_utils";
import useAddCommentThreadToState from "@/hooks/useAddCommentThreadToState";

export default function TextEditor({ document = [], onChange }) {
  // workaround to make the editor behave properly with vite hot reloading
  const editorRef = useRef()
  if (!editorRef.current) editorRef.current = withReact(withHistory(createEditor()));
  const editor = editorRef.current

  const { renderElement, renderLeaf } = useEditorConfig(editor);
  const addCommentThread = useAddCommentThreadToState();

  useEffect(() => {
    initializeStateWithAllCommentThreads(editor, addCommentThread);
  }, [editor, addCommentThread]);

  return (
    <div className={"flex flex-col"}>
      <div className="bg-document-background flex flex-row justify-center">
        <div className={"bg-white mx-40 my-20 p-16 max-w-4xl min-h-screen "}>
          <Slate editor={editor} initialValue={document} onChange={onChange}>
            <Toolbar />
            <Editable
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              onKeyDown={(event) => hotkeys(event, editor)}
              className="flex flex-col focus:outline-none"
              />
          </Slate>
        </div>
      </div>
    </div>
  );
}