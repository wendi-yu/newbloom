import classNames from "classnames";

export default function CommentedText(props) {
  const { commentThreads, ...otherProps } = props;

  const commentStyle = {
    backgroundColor: '#feeab5',
  };

  return (
    <span
      {...otherProps}
      className={classNames({
        comment: true,
      })}
      style={commentStyle}
    >
      {props.children}
    </span>
  );
}