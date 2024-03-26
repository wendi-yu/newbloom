import SidebarComment from "@/components/document/Comments/SidebarComment";
import { Row, Col } from 'antd';
import { useRecoilValue } from "recoil";
import { commentThreadIDsState } from "@/util/CommentRedactionState"

function CommentSideBar () {

    const allCommentThreadIDs = useRecoilValue(commentThreadIDsState);

    const comment = {
        author: "Soliyana",
        text: "Should I redact this?",
        creationTime: new Date()
    }

    return (
        <div className="flex flex-col mt-20 mb-7 space-y-4 w-72">
           {Array.from(allCommentThreadIDs).map((id) => {
                return (
                    <Row key={id}>
                        <Col>
                            <SidebarComment id={id} comment={comment} />
                        </Col>
                    </Row>
                );
            })}
         </div>
    );

}

export default CommentSideBar