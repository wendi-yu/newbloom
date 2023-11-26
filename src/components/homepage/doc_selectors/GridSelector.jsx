import Moment from 'moment';
import { Link } from "react-router-dom";
import DocFileIcon from "@/assets/home_doc_file_icon.svg";
import { DOC_ID_QS } from '@/util/constants';

const DocumentFile = ({ docInfo }) => {
    return <Link to={`/document?${DOC_ID_QS}=${docInfo.id}`}>
        <div className="w-56 bg-gray-100 rounded-md flex flex-col">
            <div className="flex flex-col p-2 divide-y divide-black">
                <img src={DocFileIcon} className="w-24 my-8 m-auto" />
                <div className="flex flex-col px-4 space-y-4 font-normal">
                    <div className="text-gray-600 pt-1">
                        {docInfo.name}
                    </div>
                    <div className="w-full text-right text-gray-400 text-xs">
                        {Moment(docInfo.dateLastModified).format('MMM D, YYYY')}
                    </div>
                </div>
            </div>
        </div>
    </Link>
}

const DocumentSelector = ({ docInfos }) => {
    return <div className="flex flex-row flex-wrap p-2 mt-2 pt-5 gap-10">
        {docInfos.map((docInfo) =>
            <DocumentFile key={docInfo.id} docInfo={docInfo} />
        )}
    </div>
}

export default DocumentSelector