import classNames from "classnames";

export default function CommentedText(props) {

  const commentStyle = {
    backgroundColor: '#feeab5',
  };

  return (
    <span
      className={classNames({
        comment: true,
      })}
      style={commentStyle}
    >
      {props.children}
    </span>
  );
}

