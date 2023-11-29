import classNames from "classnames";

import CommentRow from "./CommentRow";

import { Editor, Path, Text, Transforms } from "slate";
import { useEditor } from "slate-react";
import { useState, useCallback } from "react";

import { commentThreadIDsState, commentThreadsState, activeCommentThreadIDAtom} from "../../../../utils/CommentState";
import { useRecoilValue, useRecoilState } from "recoil";

import { Card, CardHeader, Avatar, IconButton} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    root: {
      maxWidth: 345
    }
});

export default function CommentsSidebar(params) {
  const allCommentThreadIDs = useRecoilValue(commentThreadIDsState);

  const classes = useStyles();

  return (
    Array.from(allCommentThreadIDs).map((id) =>
        <Card className={classes.root}>
        <CardHeader
            avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
                :)
            </Avatar>
            }
            action={
            <IconButton aria-label="settings">
                Resolve
            </IconButton>
            }
            title="Soliyana"
            subheader={ <CommentThread key={id} id={id} />}
        />
        </Card>
    )
  );

}

//TODO: need to refactor this to use material UI

function CommentThread({ id }) {
  const editor = useEditor();
  const { comments } = useRecoilValue(commentThreadsState(id));

  const [shouldShowReplies, setShouldShowReplies] = useState(false);

  const [activeCommentThreadID, setActiveCommentThreadID] = useRecoilState(
    activeCommentThreadIDAtom
  );

  const onClick = useCallback(() => {

    const textNodesWithThread = Editor.nodes(editor, {
      at: [],
      mode: "lowest",
      match: (n) => Text.isText(n) && getCommentThreadsOnTextNode(n).has(id),
    });

    let textNodeEntry = textNodesWithThread.next().value;
    const allTextNodePaths = [];

    while (textNodeEntry != null) {
      allTextNodePaths.push(textNodeEntry[1]);
      textNodeEntry = textNodesWithThread.next().value;
    }

    // sort the text nodes
    allTextNodePaths.sort((p1, p2) => Path.compare(p1, p2));

    // set the selection on the editor
    Transforms.select(editor, {
      anchor: Editor.point(editor, allTextNodePaths[0], { edge: "start" }),
      focus: Editor.point(
        editor,
        allTextNodePaths[allTextNodePaths.length - 1],
        { edge: "end" }
      ),
    });

    // Update the Recoil atom value.
    setActiveCommentThreadID(id);
  }, [editor, id, setActiveCommentThreadID]);
    
  const onBtnClick = useCallback(() => {
    setShouldShowReplies(!shouldShowReplies);
  }, [shouldShowReplies, setShouldShowReplies]);

  if (comments.length === 0) {
    return null;
  }

  const [firstComment, ...otherComments] = comments;

  return (
    // <Card
    //   body={true}
    //   className={classNames({
    //     "comment-thread-container": true,
    //   })}
    // >
    //   <CommentRow comment={firstComment} showConnector={false} />
    //   {shouldShowReplies
    //     ? otherComments.map((comment, index) => (
    //         <CommentRow key={`comment-${index}`} comment={comment} showConnector={true} />
    //       ))
    //     : null}
    //   {comments.length > 1 ? (
    //     <Button
    //       className={"show-replies-btn"}
    //       size="sm"
    //       variant="outline-primary"
    //       onClick={onBtnClick}
    //     >
    //       {shouldShowReplies ? "Hide Replies" : "Show Replies"}
    //     </Button>
    //   ) : null}
    // </Card>
    <Card
        className={classNames({
          "comment-thread-container": true,
          "is-active": activeCommentThreadID === id,      
        })}
        onClick={onClick}
      >
      <CommentRow comment={firstComment} showConnector={false} />
    </Card>
    
  );
}