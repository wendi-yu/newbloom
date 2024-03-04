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
import docApi from "@/util/document_apis";
import Toolbar from "@/components/common/Toolbar/Toolbar"
import { useParams } from 'react-router-dom';
import { DOC_ID_PARAM } from '@/util/constants';
import { RecoilRoot } from 'recoil';

function Document() {
  const [documentView, setDocumentView] = useState("document")

  const DocumentIcon = <img src={DocumentSVG} className="h-6" />
  const TableIcon = <img src={TableSVG} className="h-6" />
  const CardIcon = <img src={CardSVG} className="h-6" />

  const docId = useParams()[DOC_ID_PARAM];

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
    <div className='flex flex-col document h-full'>
      <Header documentName="Test Doc Title" />
      <div className="flex flex-col sticky">
        <div className="flex space-x-1.5 text-sm pl-2.5 pb-2.5">
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
        <Toolbar/>
      </div>
      <RecoilRoot>
        <ViewComponent className={"flex flex-grow"} />
      </RecoilRoot>
    </div>
  );
}

export default Document;
