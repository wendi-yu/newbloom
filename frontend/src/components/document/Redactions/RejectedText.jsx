const RejectedText = props => {
    const { color, children, ...rest } = props;
    
    return (
        <span
            {...props}
            className={`bg-${color} hover:bg-${color}-darker underline decoration-suggested-redaction hover:underline-offset-2`}
        >
            {props.children}
        </span>
    );
}


export default RejectedText