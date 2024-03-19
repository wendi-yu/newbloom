import TextEditor from '@/components/TextEditor.jsx';
import { useState } from 'react';
import { useSelection } from 'useEditorConfig'

const DocumentView = ({ document }) => {
    const [documentState, updateDocumentState] = useState(document.documentBody);
    const [selection, setSelection] = useSelection(editor);

    const onChangeHandler = useCallback(
        (document) => {
          onChange(document);
          setSelection(editor.selection);
          updateDocumentState
        },
        [editor.selection, onChange, setSelection]
      );

    return (
        <TextEditor document={documentState} onChange={onChangeHandler} selection={selection}/>
    );
}

export default DocumentView;