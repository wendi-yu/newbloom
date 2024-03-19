import { Editable, Slate, withReact } from "slate-react";
import useEditorConfig from "@/hooks/useEditorConfig";

import { createEditor } from "slate";
import { useEffect, useRef } from "react";
import { withHistory } from "slate-history";

import Toolbar from "@/components/common/Toolbar/Toolbar";

import { initializeStateWithAllCommentThreads } from "@/util/editorCommentUtils";
import useAddCommentThreadToState from "@/hooks/useAddCommentThreadToState";

export default function TextEditor({ document = [], onChange}) {
  // workaround to make the editor behave properly with vite hot reloading
  const editorRef = useRef();
  if (!editorRef.current)
    editorRef.current = withReact(withHistory(createEditor()));
  const editor = editorRef.current;

  const { renderElement, renderLeaf, onKeyDown } = useEditorConfig(editor);
  const addCommentThread = useAddCommentThreadToState();

  useEffect(() => {
    initializeStateWithAllCommentThreads(editor, addCommentThread);
  }, [editor, addCommentThread]);

  return (
    <div className="flex flex-col h-full">
      <Slate editor={editor} initialValue={document} onChange={onChange}>
        <Toolbar/>
        <div className="bg-document-background flex flex-row justify-center">
          <div className="bg-white mx-40 mt-20 mb-7  max-w-4xl min-h-screen">
            <Editable
              renderElement={renderElement}
              onKeyDown={onKeyDown}
              renderLeaf={renderLeaf}
              className="flex flex-col p-16 focus:outline-none h-full overflow-y-scroll"
            />
          </div>
        </div>
      </Slate>
    </div>
  );
}
