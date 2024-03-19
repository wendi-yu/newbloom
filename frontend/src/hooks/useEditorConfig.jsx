import StyledText from "@/components/document/DocumentView/StyledText";
import areEqual from "deep-equal";
import { useState, useCallback } from "react";

export default function useEditorConfig() {
  return { renderElement, renderLeaf };
}

function renderElement(props) {
  const { children, attributes } = props;
  return <p {...attributes}>{children}</p>;
}

function renderLeaf(props) {
  return <StyledText {...props} />;
}

//notify of selection change and store it in the Editor component’s state
export function useSelection(editor) {
  const [selection, setSelection] = useState(editor.selection);
  const setSelectionOptimized = useCallback(
    (newSelection) => {
      // don't update the component state if selection hasn't changed.
      if (areEqual(selection, newSelection)) {
        return;
      }
      setSelection(newSelection);
    },
    [setSelection, selection]
  );

  return [selection, setSelectionOptimized];
}