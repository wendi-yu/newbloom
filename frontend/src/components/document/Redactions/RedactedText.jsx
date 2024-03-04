import classNames from "classnames";

export default function RedactedText(props) {
  const { redactedThreads, ...otherProps } = props; // eslint-disable-line no-unused-vars

  return (
    <span
      {...otherProps}
      className={classNames({
        comment: true,
        'bg-curr-redaction': true
      })}
    >
      {props.children}
    </span>
  );
}