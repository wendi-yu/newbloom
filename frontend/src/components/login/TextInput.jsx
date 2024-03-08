import {Input} from "antd"

export default function TextInput ({text, icon }) {
    
    const inputStyle = {
        backgroundColor: "#EFEFEF",
        width: '275px'
    }

    return (
        <div >
            <Input placeholder={text} prefix={icon} variant="filled" style={inputStyle}/>
        </div>
    );
    
}