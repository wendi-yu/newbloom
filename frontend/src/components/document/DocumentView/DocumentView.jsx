import TextEditor from "@/components/TextEditor.jsx";
import { useState } from "react";

const DocumentView = ({ document }) => {
  const [documentState, updateDocumentState] = useState(document);

  return (
    <TextEditor
      document={documentState}
      updateDocumentState={updateDocumentState}
    />
  );
};

export default DocumentView;
