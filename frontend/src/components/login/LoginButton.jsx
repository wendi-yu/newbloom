import {Button} from "antd";

export default function LoginButton ({text}) {

    const buttonStyle = {
        backgroundColor: "#5C00B8",
        border: "none",
        color: "white",
        fontWeight: 600
    };

    return (
        <Button style={buttonStyle} className="mb-10 mt-5">
            {text}
        </Button>
    );


}