import '@/App.css'
import { useState } from 'react'
import Header from "@/components/document/Header/Header"
import ViewToggleButton from '../components/document/Header/ViewToggleButton';
import DocumentSVG from "@/assets/document.svg"
import TableSVG from "@/assets/table.svg"
import CardSVG from "@/assets/pie_chart.svg"
import DocumentView from '../components/document/DocumentView/DocumentView';
import CardView from '../components/document/CardView/CardView';
import TableView from '../components/document/TableView/TableView';

function Document() {
  const [documentView, setDocumentView] = useState("document")

  const DocumentIcon = <img src={DocumentSVG} className="h-6" />
  const TableIcon = <img src={TableSVG} className="h-6" />
  const CardIcon = <img src={CardSVG} className="h-6" />

  const ViewComponent = () => {
    if (documentView == "document") {
      return <DocumentView />
    } else if (documentView == "card") {
      return <CardView />
    } else {
      return <TableView />
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
      <h1 className="bg-red-500">Document Viewsss</h1>
      <ViewComponent />
    </div>
  );
}

export default Document;
