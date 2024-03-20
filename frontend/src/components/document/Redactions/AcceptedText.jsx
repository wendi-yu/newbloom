
export default function AcceptedText(props) {

    const { color, children, ...rest } = props;

    return (
        <span
            {...props}
            className={`bg-${color} hover:bg-${color}-darker text-accepted-redaction hover:text-accepted-redaction-darker`}
        >
            {props.children}
        </span>
    );
}