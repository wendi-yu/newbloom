import StyledText from "@/components/document/DocumentView/StyledText";

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
