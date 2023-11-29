import StyledText from "../components/document/DocumentView/StyledText";

export default function useEditorConfig(editor) {
  return { renderElement, renderLeaf, KeyBindings };
}

function renderElement(props) {
  const { children, attributes } = props;
      return <p {...attributes}>{children}</p>;
}

const KeyBindings = {
  onKeyDown: (editor, event) => {
    if (isHotkey("mod+b", event)) {
      toggleStyle(editor, "bold");
      return;
    }
    if (isHotkey("mod+u", event)) {
      toggleStyle(editor, "underline");
      return;
    }
  },
};

function renderLeaf(props) {
  return <StyledText {...props} />;
}
