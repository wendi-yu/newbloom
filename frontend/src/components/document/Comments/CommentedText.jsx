import classNames from "classnames";

export default function CommentedText(props) {

  const commentStyle = {
    backgroundColor: 'rgba(255, 236, 64, 0.4)',
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

