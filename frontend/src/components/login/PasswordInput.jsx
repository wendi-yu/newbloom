import {Input} from "antd"


export default function PasswordInput ({text, icon}) {

    const inputStyle = {
        backgroundColor: "#EFEFEF"
    }

    return (
        <span>
            <Input.Password placeholder={text} prefix={icon} variant="filled" style={inputStyle}/>
        </span>
    );
    
}