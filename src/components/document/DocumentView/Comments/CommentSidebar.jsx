import "./CommentSidebar.css";
import CommentRow from "./CommentRow";

import { useState, useCallback } from "react";

import { commentThreadIDsState, commentThreadsState} from "../../../../utils/CommentState";
import { useRecoilValue } from "recoil";

import { Card, CardHeader, Avatar, IconButton} from '@mui/material';
// import { makeStyles } from '@mui/styles';

// const useStyles = makeStyles({
//     root: {
//       maxWidth: 345
//     }
// });

// export default function CommentsSidebar(params) {
//   const allCommentThreadIDs = useRecoilValue(commentThreadIDsState);

//   const classes = useStyles();

//   return (
//     Array.from(allCommentThreadIDs).map((id) =>
//         <Card className={classes.root}>
//         <CardHeader
//             avatar={
//             <Avatar aria-label="recipe" className={classes.avatar}>
//                 :)
//             </Avatar>
//             }
//             action={
//             <IconButton aria-label="settings">
//                 Resolve
//             </IconButton>
//             }
//             title="Soliyana"
//             subheader={ <CommentThread key={id} id={id} />}
//         />
//         </Card>
//     )
//   );
// }

//TODO: need to refactor this to use material UI

function CommentThread({ id }) {
  const { comments } = useRecoilValue(commentThreadsState(id));

  const [shouldShowReplies, setShouldShowReplies] = useState(false);
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
    <CommentRow comment={firstComment} showConnector={false} />
  );
}