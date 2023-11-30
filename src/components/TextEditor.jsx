import { Editable, Slate, withReact } from "slate-react";
import useEditorConfig from "@/hooks/useEditorConfig";

import { createEditor } from "slate";
import { useMemo, useEffect } from "react";

import { initializeStateWithAllCommentThreads } from "@/util/editorCommentUtils";
import useAddCommentThreadToState from "@/hooks/useAddCommenttoState";

export default function TextEditor({ document = [], onChange }) {
  const editor = useMemo(() => withReact(createEditor()), []);

  const { renderElement, renderLeaf } = useEditorConfig(editor);

  const addCommentThread = useAddCommentThreadToState();

  useEffect(() => {
    initializeStateWithAllCommentThreads(editor, addCommentThread);
  }, [editor, addCommentThread]);

  //TODO: styling
  return (
    <div className={"flex flex-col"}>
      <Slate editor={editor} initialValue={document} onChange={onChange}>
        <div className="h-8 bg-gray-300" />
        <div className="flex flex-row">
          <div className={"bg-document-background flex justify-center h-full"}>
            <div className={"bg-white w-1/2 bg-grey h-1/3"}>
              <div className={""}>
                <Editable renderElement={renderElement} renderLeaf={renderLeaf} className="flex flex-col" />
              </div>
            </div>
          </div>
        </div>
      </Slate>
    </div>
  );
}

