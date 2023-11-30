import TextEditor from '@/components/TextEditor.jsx';
import docText from "@/assets/example_document";
import { useState } from 'react';

import { RecoilRoot } from "recoil";

const DocumentView = () => {
    const [document, updateDocument] = useState(docText.children);

    return (
        <RecoilRoot>
            <TextEditor document={document} onChange={updateDocument} />
        </RecoilRoot>
    );
}

export default DocumentView;