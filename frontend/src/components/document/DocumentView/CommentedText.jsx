import classNames from "classnames";

export default function CommentedText(props) {

  //dummy function for onclick
  const onClick = () => {
  };

  const commentStyle = {
    backgroundColor: '#feeab5',
  };

  return (
    <span
      className={classNames({
        comment: true,
      })}
      style={commentStyle}
      onClick={onClick}
    >
      {props.children}
    </span>
  );
}

