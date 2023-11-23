import { Editable, Slate, withReact } from "slate-react";

import { createEditor } from "slate";
import { useMemo } from "react";

export default function TextEditor({ document, onChange }) {
  const editor = useMemo(() => withReact(createEditor()), []);
  return (
    <Slate editor={editor} value={document} onChange={onChange}>
      <Editable />
    </Slate>
  );
}
