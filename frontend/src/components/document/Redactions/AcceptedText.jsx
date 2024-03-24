
export default function AcceptedText(props) {

    const { color, children, ...rest } = props;
    return (
        <span
            {...rest}
            className={`bg-${color} hover:bg-${color}-darker text-accepted-redaction hover:text-accepted-redaction-darker`}
        >
            {children}
        </span>
    );
}