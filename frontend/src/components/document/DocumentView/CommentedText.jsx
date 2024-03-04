import classNames from "classnames";

export default function CommentedText(props) {
  const { commentThreads, textnode, ...otherProps } = props;

  const onClick = () => {
  };

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
      onClick={onClick}
    >
      {props.children}
    </span>
  );
}

