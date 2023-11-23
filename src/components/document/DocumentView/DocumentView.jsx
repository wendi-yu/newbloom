import TextEditor from '@/components/TextEditor.jsx';
import docText from "@/assets/example_document"
import { useState } from 'react'

const DocumentView = () => {
    const [document, updateDocument] = useState(docText);

    return (
        <>
            <div className="flex justify-content-center w-80 bg-grey">
                <TextEditor document={document} onChange={updateDocument} />
            </div>
        </>
    );
}

export default DocumentView;