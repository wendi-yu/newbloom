import { Editable, Slate, withReact } from "slate-react";
import { initializeStateWithAllCommentThreads } from "@/util/editorCommentUtils";
import { Transforms, createEditor } from "slate";
import { useEffect, useRef } from "react";
import useEditorConfig from "@/hooks/useEditorConfig";
import useAddCommentThreadToState from "@/hooks/useAddCommenttoState";

const Card = ({ card, idx, total }) => {
    const editorRef = useRef()
    if (!editorRef.current) editorRef.current = withReact(createEditor())
    const editor = editorRef.current

    const { renderElement, renderLeaf } = useEditorConfig(editor);

    const addCommentThread = useAddCommentThreadToState();

    useEffect(() => {
        initializeStateWithAllCommentThreads(editor, addCommentThread);
    }, [editor, addCommentThread]);


    // TODO: pull card.body.children into a state, update it in this function
    // we'll need to use a reducer to avoid infinite state change updating
    useEffect(() => {
        // empty the node
        editor.children.forEach(() => {
            Transforms.delete(editor, { at: [0] })
        })
        Transforms.insertNodes(editor, [{ children: card.body.children }])
        console.log(editor.children)
    }, [card.body.children, editor])

    const width = (idx + 1) / total * 100 || 5
    return <div className="w-3/4 bg-white rounded">
        <div className="bg-primary-light h-2 rounded" style={{ width: width + "%" }} />
        <div className="mt-1 mx-2 text-primary-light">{idx + 1} / {total}</div>
        <div className="p-8">
            <Slate editor={editor} initialValue={[{ children: card.body.children }]} >
                <Editable renderElement={renderElement} renderLeaf={renderLeaf} />
            </Slate>
        </div>
    </div >
}

export default Card