import { Editable, Slate, withReact } from "slate-react";
import useEditorConfig from "../hooks/useEditorConfig";

import { createEditor } from "slate";
import { useMemo, useState } from "react";

export default function TextEditor({ document=[], onChange }){
  const editor = useMemo(() => withReact(createEditor()), []);
  
  const { renderElement, renderLeaf } = useEditorConfig(editor);
  return (
    <Slate editor={editor} initialValue={document} onChange={onChange}>
      <Editable renderElement={renderElement} renderLeaf={renderLeaf} />
    </Slate>
  );
}

function DebugObserver() {
  // see API link above for implementation.
}

