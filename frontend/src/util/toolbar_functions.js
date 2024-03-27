import jsPDF from 'jspdf';
import { ACCEPTED_PREFIX, getRedactionsOnTextNode } from "@/util/editorRedactionUtils";

export const toPDF = (body) => {
    return Array.from(body.document.documentBody)
        .map((paragraph) => {
            const p_tag_start = "<p>";
            const p_tag_end = "</p>";
            const internal_text = paragraph.children.map((node) => {
                const isAccepted = getRedactionsOnTextNode(node, ACCEPTED_PREFIX).size > 0;
                return isAccepted ? "XXXXX" : node.text.replace("\n", p_tag_end + "<br>" + p_tag_start);
            });

            const res = p_tag_start + internal_text.join(" ") + p_tag_end;
            return res;
        }
    )
    .join("<br>");
};

export function exportDoc(document) {
    const pdf_doc = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: 'letter'
    });

    let str = toPDF(document)

    pdf_doc.html(str, {
        async callback(doc) {
            await doc.save('pdf_name');
        },
        width: 560,
        windowWidth: 560,
        margin: [30, 30, 30, 30]
    });
}

export function markAsDone() {

}
