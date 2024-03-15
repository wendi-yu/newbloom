import { Editable, useSlate } from "slate-react";
import { Transforms } from "slate";
import { useEffect } from "react";
import useEditorConfig from "@/hooks/useEditorConfig";

const Card = ({ card, idx, total }) => {

    const editor = useSlate();
    const { renderElement, renderLeaf } = useEditorConfig(editor);

    // TODO: pull card.body.children into a state, update it in this function
    // we'll need to use a reducer to avoid infinite state change updating
    useEffect(() => {
        // empty the node
        editor.children.forEach(() => {
            Transforms.delete(editor, { at: [0] })
        })
        Transforms.insertNodes(editor, [{ children: card.body }])
    }, [card.body, editor])

    const width = (idx + 1) / total * 100 || 5
    return <div className="w-3/4 bg-white rounded">
        <div className="bg-primary-light h-2 rounded" style={{ width: width + "%" }} />
        <div className="mt-1 mx-2 text-primary-light">{idx + 1} / {total}</div>
        <div className="p-8">
            <Editable renderElement={renderElement} renderLeaf={renderLeaf} />
        </div>
    </div >
}

export default Card