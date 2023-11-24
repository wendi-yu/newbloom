import { DefaultElement } from "slate-react";
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

// function renderLeaf({ attributes, children, leaf }) {
//     let el = <>{children}</>;

//     if (leaf.current) {
//     }
    
//     if (leaf.suggested) {
//     }

//     if (leaf.redacted) {
//     }

//     if (leaf.rejected) {
//     }

//     if (leaf.underline) {
//     el = <u>{el}</u>;
//     }

//     if (leaf.bold) {
//         el = <strong>{el}</strong>;
//     }

//     return <span {...attributes}>{el}</span>;
// }

function renderLeaf(props) {
  return <StyledText {...props} />;
}
