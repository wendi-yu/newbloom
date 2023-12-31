import TextEditor from '@/components/TextEditor.jsx';
import { useState } from 'react';

const DocumentView = ({ document }) => {
    const [documentState, updateDocumentState] = useState(document.documentBody);

    return (
        <TextEditor document={documentState} onChange={updateDocumentState} />
    );
}

export default DocumentView;