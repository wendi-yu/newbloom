import { useState, useEffect, useRef } from "react";
import CardSelector from "./CardSelector";
import Card from "./Card";
import CheckIcon from "@/assets/check_ring.svg";
import CloseIcon from "@/assets/close_ring.svg";
import NextIcon from "@/assets/next.svg";
import PreviousIcon from "@/assets/previous.svg";
import {
  getAllChildCommentThreads,
  initializeStateWithAllCommentThreads,
} from "@/util/editorCommentUtils";
import { getCommentById } from "@/util/api/comment_apis";
import { CommentSection } from "./CommentSection";
import Toolbar from "@/components/common/ToolBar/Toolbar";

import { Slate, withReact } from "slate-react";
import { createEditor } from "slate";
import { withHistory } from "slate-history";
import useAddCommentThreadToState from "@/hooks/useAddCommentThreadToState";

// this is a stub, replace it with an API call or something later
const splitText = (document) => {
  return document.documentBody;
};

const CardView = ({ document }) => {
  const paragraphs = splitText(document);
  const [cards, setCards] = useState(
    paragraphs.map((par) => ({
      body: par.children,
      completed: false,
      comments: Object.keys(getAllChildCommentThreads(par)).map((id) =>
        getCommentById(id)
      ),
    }))
  );
  const [selectedIdx, setSelectedIdx] = useState(0);

  const getNextIncomplete = () => {
    for (let i = 1; i < cards.length + 1; ++i) {
      const newIdx = (selectedIdx + i) % cards.length;
      if (!cards[newIdx].completed) return newIdx;
    }
    return (selectedIdx + 1) % cards.length;
  };

  const CompletionButton = ({ completed }) => {
    return (
      <button
        className={`bg-success ${
          completed ? "opacity-75" : ""
        } flex space-x-2 text-white items-center border-warning hover:border-white focus:outline-none`}
        onClick={(e) => {
          cards[selectedIdx].completed = !completed;
          setCards([...cards]);
          e.currentTarget.blur();
          if (!completed) setSelectedIdx(getNextIncomplete());
        }}
      >
        <img src={completed ? CloseIcon : CheckIcon} className="h-8" />
        <div>{completed ? "Re-mark for Review" : "Mark as Completed"}</div>
      </button>
    );
  };

  const editorRef = useRef();
  if (!editorRef.current)
    editorRef.current = withReact(withHistory(createEditor()));
  const editor = editorRef.current;

  const addCommentThread = useAddCommentThreadToState();

  useEffect(() => {
    initializeStateWithAllCommentThreads(editor, addCommentThread);
  }, [editor, addCommentThread]);

  function setCardBody(body) {
    const newCards = [...cards];
    newCards[selectedIdx].body = body;
    setCards(newCards);
  }

  return (
    <div className="h-4/5 w-full">
      <Slate
        editor={editor}
        initialValue={[{ children: cards[selectedIdx].body }]}
        onChange={(v) => {
          setCardBody(v[0].children);
        }}
      >
        <Toolbar />
        <div className="w-80 float-left h-full pb-8">
          <CardSelector
            cards={cards}
            selectedIdx={selectedIdx}
            setSelectedIdx={setSelectedIdx}
          />
        </div>
        <div className="bg-gray-100 h-full ml-80 px-8 flex flex-col justify-items-stretch">
          <div className="flex justify-end p-4">
            <CompletionButton completed={cards[selectedIdx].completed} />
          </div>
          <div className="p-6 flex space-x-2 items-center h-1/2">
            <button
              className="p-2 w-1/8 bg-white"
              onClick={(e) => {
                // js doesn't have a mod operator, do this to make sure we don't get a negative index
                setSelectedIdx((selectedIdx + cards.length - 1) % cards.length);
                e.currentTarget.blur();
              }}
            >
              <img src={PreviousIcon} />
            </button>
            <Card
              card={cards[selectedIdx]}
              idx={selectedIdx}
              total={cards.length}
            />
            <button
              className="p-2 w-1/8 bg-white"
              onClick={(e) => {
                setSelectedIdx((selectedIdx + 1) % cards.length);
                e.currentTarget.blur();
              }}
            >
              <img src={NextIcon} />
            </button>
          </div>
          <CommentSection comments={cards[selectedIdx].comments} />
        </div>
      </Slate>
    </div>
  );
};

export default CardView;
