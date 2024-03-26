export default function CommentedText(props) {

  const { leaf, children, isActive, ...otherProps } = props;

  return (
    <span
      {...otherProps}
      className={`${ isActive ? 'bg-comment-darker' : 'bg-comment'}`}
    >
      {children}
    </span>
  );
}
