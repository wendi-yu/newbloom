export default function HighlightedText(props) {

  const { color, children, ...rest } = props;

  return (
    <span
      {...props}
      className={`bg-${color} hover:bg-${color}-darker`}
    >
      {children}
    </span>
  );
}