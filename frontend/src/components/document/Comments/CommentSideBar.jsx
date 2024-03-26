import SidebarComment from "@/components/document/Comments/SidebarComment";
import { Row, Col } from 'antd';
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { commentThreadIDsState } from "@/util/CommentRedactionState"

import { useParams } from "react-router-dom";
import { DOC_ID_PARAM } from "@/util/constants";

import { getAllCommentsFromDoc } from "@/util/localDocStore";

function CommentSideBar () {

    const allCommentThreadIDs = useRecoilValue(commentThreadIDsState);

    const docId = useParams()[DOC_ID_PARAM];
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const allComments = getAllCommentsFromDoc(docId)
        console.log(allComments)
        if (document && allComments) {
            setComments(allComments);
        }
    }, [docId]);

    return (
        <div className="flex flex-col mt-20 mb-7 space-y-4 w-72">
           {Array.from(allCommentThreadIDs).map((id) => {
                const matchingComment = comments.find(comment => comment.id === id);
                return (
                    <Row key={id}>
                        <Col>
                            {/* Pass only the matching comment to SidebarComment */}
                            {matchingComment && <SidebarComment id={id} comment={matchingComment} />}
                        </Col>
                    </Row>
                );
            })}
         </div>
    );

}

export default CommentSideBar