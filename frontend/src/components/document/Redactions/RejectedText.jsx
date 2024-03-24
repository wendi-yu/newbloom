const RejectedText = props => {
    const { color, children, ...rest } = props;
    return (
        <span
            {...rest}
            className={`bg-${color} hover:bg-${color}-darker underline decoration-suggested-redaction hover:underline-offset-2`}
        >
            {children}
        </span>
    );
}


export default RejectedText