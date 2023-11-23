import TextEditor from '@/components/TextEditor.jsx';
import docText from "@/assets/example_document"

const DocumentView = () => {
    const [document, updateDocument] = useState(docText);

    return (
        <>
            <TextEditor document={document} onChange={updateDocument} />
        </>
    );
}


export default DocumentView;


