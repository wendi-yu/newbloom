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