export default function SuggestedText(props) {

  return (
    <span
      {...props}
      className="bg-suggested-redaction hover:bg-suggested-redaction-darker"
    >
      {props.children}
    </span>
  );
}