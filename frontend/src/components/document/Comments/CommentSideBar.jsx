import SidebarComment from "@/components/document/Comments/SidebarComment";
import {commentThreadIDsState} from "@/util/CommentRedactionState";
import { useRecoilValue } from "recoil";
import { Row, Col } from 'antd';

function CommentSideBar () {

    const allCommentThreadIDs = useRecoilValue(commentThreadIDsState);

    const comment = {
        author: 'John Doe',
        text: 'This is a comment.',
        creationTime: '2022-03-17',
    };

    return (
        <div className="flex flex-col mt-20 mb-7">
            {Array.from(allCommentThreadIDs).map((id) => (
            <Row key={id}>
                <Col>
                    <SidebarComment id={id} comment={comment}/>
                </Col>
            </Row>
            ))}
        </div>
    );

}

export default CommentSideBar