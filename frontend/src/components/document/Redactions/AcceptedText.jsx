
export default function AcceptedText(props) {
    return (
        <span
            {...props}
            className="text-accepted-redaction hover:text-accepted-redaction-darker"
        >
            {props.children}
        </span>
    );
}