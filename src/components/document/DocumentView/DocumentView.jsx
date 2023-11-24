import TextEditor from '@/components/TextEditor.jsx';
import docText from "@/assets/example_document";
import { useState } from 'react';

import { RecoilRoot } from "recoil";

const DocumentView = () => {
    const [document, updateDocument] = useState(docText);

    return (
        <RecoilRoot>
            <div>
                <TextEditor document={document} onChange={updateDocument} />
            </div>
        </RecoilRoot>
    );
}

export default DocumentView;