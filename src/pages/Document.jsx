import '@/App.css'
import { useState } from 'react'
import Header from "@/components/document/Header/Header"
import ViewToggleButton from '@/components/document/Header/ViewToggleButton';
import DocumentSVG from "@/assets/document.svg"
import TableSVG from "@/assets/table.svg"
import CardSVG from "@/assets/pie_chart.svg"
import DocumentView from '@/components/document/DocumentView/DocumentView';
import CardView from '@/components/document/CardView/CardView';
import TableView from '@/components/document/TableView/TableView';
import { useSearchParams } from 'react-router-dom';
import docApi from "@/util/document_apis";

function Document() {
  const [documentView, setDocumentView] = useState("document")

  const DocumentIcon = <img src={DocumentSVG} className="h-6" />
  const TableIcon = <img src={TableSVG} className="h-6" />
  const CardIcon = <img src={CardSVG} className="h-6" />

  const [searchParams,] = useSearchParams();
  const docId = searchParams.get("id") ?? 0

  const fullDocument = docApi.getDocById(docId)

  const ViewComponent = () => {
    if (documentView == "document") {
      return <DocumentView document={fullDocument} />
    } else if (documentView == "card") {
      return <CardView document={fullDocument} />
    } else {
      return <TableView document={fullDocument} />
    }
  }

  return (
    <div className='document h-full'>
      <Header documentName="Test Doc Title" />
      <div className="sticky flex space-x-1.5 text-sm pl-2.5 pb-2.5">
        <ViewToggleButton
          leadingIcon={DocumentIcon}
          selected={documentView == "document"}
          onClick={(e) => {
            setDocumentView("document")
            e.currentTarget.blur()
          }}
        >
          Document View
        </ViewToggleButton>
        <ViewToggleButton
          leadingIcon={TableIcon}
          selected={documentView == "table"}
          onClick={(e) => {
            setDocumentView("table")
            e.currentTarget.blur()
          }}
        >
          Table View
        </ViewToggleButton>
        <ViewToggleButton
          leadingIcon={CardIcon}
          selected={documentView == "card"}
          onClick={(e) => {
            setDocumentView("card")
            e.currentTarget.blur()
          }}
        >
          Card View
        </ViewToggleButton>
      </div>
      <div className='bg-gray-200 h-10'></div>
      <ViewComponent />
    </div>
  );
}

export default Document;
