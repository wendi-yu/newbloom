import {Input} from "antd"


export default function PasswordInput ({text, icon, value, handleValueChange}) {

    const inputStyle = {
        backgroundColor: "#EFEFEF"
    }

    return (
        <span>
            <Input.Password placeholder={text} prefix={icon} variant="filled" style={inputStyle} value={value} onChange={handleValueChange}/>
        </span>
    );
    
}