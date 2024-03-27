import jsPDF from "jspdf";
import {
  ACCEPTED_PREFIX,
  getRedactionsOnTextNode,
} from "@/util/editorRedactionUtils";
import { slateToIndices, toSlateFormat, toText } from "./slateUtil";
import docApi from "./api/document_apis";
import { getAllCommentsFromDoc, setDocumentComments } from "./localDocStore";

export const toPDF = (body) => {
  return Array.from(body.document.documentBody)
    .map((paragraph) => {
      const p_tag_start = "<p>";
      const p_tag_end = "</p>";
      const internal_text = paragraph.children.map((node) => {
        const isAccepted =
          getRedactionsOnTextNode(node, ACCEPTED_PREFIX).size > 0;
        return isAccepted
          ? "XXXXX"
          : node.text.replace("\n", p_tag_end + "<br>" + p_tag_start);
      });

      const res = p_tag_start + internal_text.join(" ") + p_tag_end;
      return res;
    })
    .join("<br>");
};

export function exportDoc(document) {
  const pdf_doc = new jsPDF({
    orientation: "portrait",
    unit: "pt",
    format: "letter",
  });

  let str = toPDF(document);

  pdf_doc.html(str, {
    async callback(doc) {
      await doc.save("pdf_name");
    },
    width: 560,
    windowWidth: 560,
    margin: [30, 30, 30, 30],
  });
}

export async function markAsDone(document) {
  const indexForm = slateToIndices(document.documentBody);
  const allComments = getAllCommentsFromDoc(document.id);
  await docApi.updateDoc(document.id, { ...indexForm, comments: allComments });
}

export async function refresh(document, onRefresh) {
  const dbFile = (await docApi.getDoc(document.id)).file;
  const slateForm = toSlateFormat(
    toText(document.documentBody),
    dbFile.suggestions,
    dbFile.accepts,
    dbFile.rejects,
    dbFile.comment_indices,
    false
  );

  setDocumentComments(document.id, dbFile.comments);

  onRefresh(slateForm);
}
