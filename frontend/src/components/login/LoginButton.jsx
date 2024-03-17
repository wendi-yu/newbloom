import {Button} from "antd";
import { Link } from 'react-router-dom';

export default function LoginButton ({text, onSubmit}) {

    const buttonStyle = {
        backgroundColor: "#5C00B8",
        border: "none",
        color: "white",
        fontWeight: 600,
        width: '275px'
    };

    return (
        <Button style={buttonStyle} className="mb-10 mt-5" onClick={onSubmit}>
            {text}
        </Button>
    );


}