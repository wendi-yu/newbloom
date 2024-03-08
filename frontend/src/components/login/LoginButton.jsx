import {Button} from "antd";
import { Link } from 'react-router-dom';

export default function LoginButton ({text}) {

    const buttonStyle = {
        backgroundColor: "#5C00B8",
        border: "none",
        color: "white",
        fontWeight: 600,
        width: '275px'
    };

    return (
        <Link to="/">
            <Button style={buttonStyle} className="mb-10 mt-5">
                {text}
            </Button>
        </Link>
    );


}