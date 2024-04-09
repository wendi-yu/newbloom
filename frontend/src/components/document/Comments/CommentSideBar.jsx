import SidebarComment from "@/components/document/Comments/SidebarComment";
import { Row, Col } from "antd";
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { DOC_ID_PARAM } from "@/util/constants";

import { getAllCommentsFromDoc } from "@/util/localDocStore";

function CommentSideBar({ refresh }) {
  const docId = useParams()[DOC_ID_PARAM];
  const allComments = getAllCommentsFromDoc(docId);
  const [comments, setComments] = useState(allComments);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const allComments = await getAllCommentsFromDoc(docId);
        setComments([...allComments])
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [docId, refresh]);

  console.log(comments)

  return (
    <div className="flex flex-col mt-20 mb-7 space-y-4 w-72">
      {comments.map((comment) => (
        <Row key={comment.id}>
          <Col>
            {comment.replies ? (
              <SidebarComment
                id = {comment.id}
                replies = {comment.replies}
                comment={comment.comment} 
                docId={docId}
              />

            ) : (
              <SidebarComment
                id = {comment.id}
                comment={comment.comment} 
                docId={docId}
              />
            )}

          </Col>
        </Row>
      ))}
    </div>
  );
}

export default CommentSideBar;
