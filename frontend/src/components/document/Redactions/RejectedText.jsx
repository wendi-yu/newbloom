const RejectedText = props => {
    return (
        <span
            {...props}
            className="underline decoration-suggested-redaction hover:underline-offset-2"
        >
            {props.children}
        </span>
    );
}


export default RejectedText