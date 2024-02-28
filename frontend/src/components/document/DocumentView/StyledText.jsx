import { getCommentThreadsOnTextNode } from "@/util/editorCommentUtils";
import { getRedactionsOnTextNode } from "@/util/editorRedactionUtils";
import CommentedText from "./CommentedText";
import RedactedText from "../Redactions/RedactedText";
import RedactionPopover from "../Redactions/RedactionPopover";
//import { removeRedaction } from "../../../util/editorRedactionUtils";
import {accepted, rejected} from "@/assets/redacted_lists";


export default function StyledText({ attributes, children, leaf }) {

  //store and send to ML model
  function onRejectRedaction () {
    rejected.push(leaf)
  }

  //store and send to ML model
  function onAcceptRedaction () {
    accepted.push(leaf)
  }

  const commentThreads = getCommentThreadsOnTextNode(leaf);

  if (commentThreads.size > 0) {
    return (
      <CommentedText
        {...attributes}
        commentThreads={commentThreads}
        textnode={leaf}
      >
        {children}
      </CommentedText>
    );
  }

  const redactions = getRedactionsOnTextNode(leaf);
  const isPopoverVisible=true
  // const [isPopoverVisible, setIsPopoverVisible] = useState(true);

  children = (
    <RedactionPopover
      text={<span>{children}</span>}
      onAccept={onAcceptRedaction}
      onReject={onRejectRedaction}
      ifOpen={isPopoverVisible}
    />  
  );

  if (redactions.size > 0) {
    return (
      <RedactedText
      {...attributes}
      redactions={redactions}
      textNode={leaf}
      >
        {children}
      </RedactedText>
    );
  }

  return <span {...attributes}>{children}</span>;
}

  // const [redactionStatus, setRedactionStatus] = useState('');

  // useEffect(() => {
  //   if (leaf.suggested) {
  //     setRedactionStatus('bg-curr-redaction');
  //   }
  // }, [leaf.suggested]);

  // if (leaf.suggested) {
  //   children = (
  //     <RedactionPopover
  //       text={<span className={redactionStatus}>{children}</span>}
  //       onAccept={() => {
  //         setRedactionStatus('bg-accepted-redaction');
  //       }}
  //       onReject={() => {
  //         setRedactionStatus('bg-rejected-redaction underline');
  //       }}
  //     />  
  //   );
  // }

  // if (leaf.current) {
  //   children = <span className="bg-curr-redaction">{children}</span>
  // }

  // if (leaf.suggested) {
  //   children = <span className="bg-suggested-redaction">{children}</span>
  // }

  // if (leaf.accepted) {
  //   children = <span className="bg-accepted-redaction">{children}</span>
  // }