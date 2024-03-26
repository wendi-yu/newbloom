import SidebarComment from "@/components/document/Comments/SidebarComment";
import { Row, Col } from "antd";
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { DOC_ID_PARAM } from "@/util/constants";

import { getAllCommentsFromDoc } from "@/util/localDocStore";

function CommentSideBar() {

  const docId = useParams()[DOC_ID_PARAM];
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const allComments = getAllCommentsFromDoc(docId);
    console.log(allComments)
    if (document && allComments) {
      setComments(allComments);
    }
  }, [docId]);

  return (
    <div className="flex flex-col mt-20 mb-7 space-y-4 w-72">
      {Array.from(comments).map((comment) => {
        return (
          <Row key={comment.id}>
            <Col>
                <SidebarComment id={comment.id} comment={comment.comment} docId={docId}/>
            </Col>
          </Row>
        );
      })}
    </div>
  );
}

export default CommentSideBar;
