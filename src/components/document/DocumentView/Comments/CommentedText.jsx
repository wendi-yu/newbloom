import classNames from "classnames";

export default function CommentedText(props) {
  const { commentThreads, ...otherProps } = props;

  // const highlightTypes = {
  //   comment: 'bg-highlight',
  //   suggested: 'bg-suggested-redaction',
  //   rejected: 'bg-rejected-redaction',
  //   accepted: 'bg-accepted-redaction',
  //   curr: 'bg-curr-redaction'
  // };

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

// //current suggested redacted rejected
// export default function RedactedText(props){
// const { redactThreads, ...otherProps } = props;

//   return (
//     <span
//       {...otherProps}
//       className={classNames({
//         redacted: true,
//       })}
//       style={"backgroundColor: '#000'"}
//     >
//       {props.children}
//     </span>
//   );
// }