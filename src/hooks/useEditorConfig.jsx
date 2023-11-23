import { DefaultElement } from "slate-react";

export default function useEditorConfig(editor) {
  return { renderElement, renderLeaf };
}

function renderElement(props) {
  const { children, attributes } = props;
      return <p {...attributes}>{children}</p>;
}

function renderLeaf({ attributes, children, leaf }) {
    let el = <>{children}</>;

    if (leaf.current) {
    }
    
    if (leaf.suggested) {
    }

    if (leaf.redacted) {
    }

    if (leaf.rejected) {
    }

    if (leaf.underline) {
    el = <u>{el}</u>;
    }

    if (leaf.bold) {
        el = <strong>{el}</strong>;
    }

    return <span {...attributes}>{el}</span>;
}
