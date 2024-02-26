import classNames from "classnames";

export default function SuggestedRedaction(props) {
  const { redactedThreads, ...otherProps } = props; // eslint-disable-line no-unused-vars

  const redactionsStyle = {
    backgroundColor: 'bg-curr-redaction',
  };

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