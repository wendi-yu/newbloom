import ArrowSVG from "@/assets/arrow_top.svg"
import { Input } from "antd"

function CommentInput ({value, handleValueChange, submitComment}) {

    const ArrowIcon = <div onClick={submitComment}><img src={ArrowSVG} className="h-5" alt="NewBloom Logo"/></div>
   
    const inputStyle = {
        paddingRight: 5,
        paddingLeft: 5
    }

    const handleEnterKeyPress = (event) => {
        if (event.key === 'Enter') {
            submitComment();
        }
    };

    return (
        <div>
            <Input 
                suffix={ArrowIcon}
                placeholder="Comment"
                value = {value}
                className="focus:outline-none"
                style = {inputStyle}
                onChange={handleValueChange}
                onKeyDown={handleEnterKeyPress}
            />

        </div>
    );

}

export default CommentInput