export default function HighlightedText(props) {

  const { color, children, ...rest } = props;

  return (
    <span
      {...rest}
      className={`bg-${color} hover:bg-${color}-darker`}
    >
      {children}
    </span>
  );
}