import { Editable, useSlate } from "slate-react";
import { Transforms } from "slate";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

import useEditorConfig from "@/hooks/useEditorConfig";
import { maybeCommentAtom } from "@/util/CommentRedactionState"

const Card = ({ card, idx, total }) => {
  const editor = useSlate();

  const setMaybeComment = useSetRecoilState(maybeCommentAtom);
  const { renderElement, renderLeaf, onKeyDown } = useEditorConfig(editor, setMaybeComment);

  // TODO: pull card.body.children into a state, update it in this function
  // we'll need to use a reducer to avoid infinite state change updating
  useEffect(() => {
    // empty the node
    editor.children.forEach(() => {
      Transforms.delete(editor, { at: [0] });
    });
    Transforms.insertNodes(editor, [{ children: card.body }]);
  }, [card.body, editor]);

  const width = ((idx + 1) / total) * 100 || 5;
  return (
    <div className="w-3/4 bg-white rounded h-full overflow-y-scroll">
      <div className="sticky top-0 bg-white overflow-hidden z-50">
        <div
          className="bg-primary-light h-2 rounded"
          style={{ width: width + "%" }}
        />
        <div className="mt-1 mx-2 text-primary-light">
          {idx + 1} / {total}
        </div>
      </div>
      <div className="p-8">
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          className="flex flex-col focus:outline-none"
          onKeyDown={onKeyDown}
        />
      </div>
    </div>
  );
};

export default Card;
