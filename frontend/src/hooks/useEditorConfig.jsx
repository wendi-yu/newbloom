import StyledText from "@/components/document/DocumentView/StyledText";
import { useCallback} from "react";
import { KeyBindings } from "@/util/editor_utils";

export default function useEditorConfig(editor) {
  const onKeyDown = useCallback(
    (event) => KeyBindings.onKeyDown(editor, event), [editor]
  );
  return { renderElement, renderLeaf, onKeyDown };
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