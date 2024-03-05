import classNames from "classnames";

export default function RedactedText(props) {
  const { redactedThreads, bgColor, ifBgColor, ...otherProps } = props; // eslint-disable-line no-unused-vars

  return (
    <span
      {...otherProps}
      className={classNames({
        comment: true,
        [bgColor]: {ifBgColor}
      })}
    >
      {props.children}
    </span>
  );
}