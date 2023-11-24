import { Editable, Slate, withReact } from "slate-react";
import useEditorConfig from "../hooks/useEditorConfig";
import ToolBar from '../components/document/Header/Toolbar';
import useSelection from "../hooks/useSelection";

import { createEditor } from "slate";
import { useMemo, useState, useCallback } from "react";

export default function TextEditor({ document=[], onChange }){
  const editor = useMemo(() => withReact(createEditor()), []);
  const [selection, setSelection] = useSelection(editor);
  
  const { renderElement, renderLeaf } = useEditorConfig(editor);

  const onChangeHandler = useCallback(
    (document) => {
      onChange(document);
      setSelection(editor.selection);
    },
    [editor.selection, onChange, setSelection]
  );

  return (
    <div className={"flex flex-col"}>
      <Slate editor={editor} initialValue={document} onChange={onChange}>
        <ToolBar selection={selection} />
        <div className={"flex flex-row"}>
          <Editable renderElement={renderElement} renderLeaf={renderLeaf} className="flex justify-self-center w-1/2 bg-grey" />
        </div>
      </Slate>
    </div>
  );
}

function DebugObserver() {
  // see API link above for implementation.
}

