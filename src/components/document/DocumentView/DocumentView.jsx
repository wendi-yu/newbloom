import TextEditor from '@/components/TextEditor.jsx';
import docText from "@/assets/example_document";
import { useState } from 'react';

import { RecoilRoot } from "recoil";

const DocumentView = () => {
    const [document, updateDocument] = useState(docText);

    return (
        <RecoilRoot>
            <div className="flex justify-content-center w-80 bg-grey">
                <TextEditor document={document} onChange={updateDocument} />
            </div>
        </RecoilRoot>
    );
}

export default DocumentView;