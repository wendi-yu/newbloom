import Navbar from "@/components/homepage/navbar/Navbar";
import DocFileIcon from "@/assets/home_doc_file_icon.svg";
import DocSortingIcon from "@/assets/home_doc_sorting_icon.svg";
import DocApi from "@/util/document_apis";
import Moment from 'moment';
import { Link } from "react-router-dom";

import DocSortingExpandedIcon from "@/assets/home_doc_sorting_expand_icon.svg";
import DocSortingExpandIcon from "@/assets/expand_right.svg"
import Popover from '@mui/material/Popover';
import { useReducer, useState } from "react";
import Clickable from "@/components/common/Clickable";
import { SORTING_OPTIONS } from "../util/constants";


const DocumentsSelectionTopBar = ({ resort }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedSortKey, setselectedSortKey] = useState(SORTING_OPTIONS.name)

  const SortingDropDownMenu = ({ selectedSortKey, setselectedSortKey }) => {
    const sortDisplay = [
      { name: "Name", key: SORTING_OPTIONS.name },
      { name: "Date Uploaded", key: SORTING_OPTIONS.date },
      { name: "File Type", key: SORTING_OPTIONS.file }
    ]
    return <div className={'flex flex-col border-solid rounded items-start p-2 divide-y divide-black'}>
      {sortDisplay.map(so => {
        return <Clickable
          key={so.key}
          className={`text-left w-full p-0.5 px-2 ${selectedSortKey === so.key ? "bg-background-primary" : "bg-white"}`}
          onClick={() => {
            resort(so.key)
            setselectedSortKey(so.key)
          }}>
          {so.name}
        </Clickable>
      })}
    </div>
  }

  const handlePopoverOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl)
  const id = open ? 'sorting-select-popover' : undefined;

  return <div className='pt-5'>
    <div className='text-xl font-bold'>
      <div className="flex flex-row">
        <div className="text-3xl">Documents</div>
        <Clickable className="flex flex-row bg-white items-center" onClick={handlePopoverOpen}>
          <img src={DocSortingIcon} className="ml-5" />
          <img src={open ? DocSortingExpandedIcon : DocSortingExpandIcon} className="stroke-black" />
        </Clickable>
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
      >
        <SortingDropDownMenu setselectedSortKey={setselectedSortKey} selectedSortKey={selectedSortKey} />
      </Popover>
    </div>
  </div>
}

const DocumentFile = ({ docInfo }) => {
  return <Link to="/document">
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

const Home = () => {
  const docInfosRaw = DocApi.getAllDocIdsAndMetadata()

  const sorter = (currentDocInfos, newSortKey) => {
    const res = [...currentDocInfos].sort((d1, d2) => {
      const f1 = d1[newSortKey]
      const f2 = d2[newSortKey]

      if (f1 < f2) return -1;
      if (f1 > f2) return 1;
      return 0;
    })
    return res
  }

  const [docInfos, resort] = useReducer(sorter, docInfosRaw)

  return (
    <div className='flex flex-row'>
      <Navbar />
      <div className='ml-80 flex-1 p-8 divide-y divide-black'>
        <DocumentsSelectionTopBar resort={resort} />
        <DocumentSelector docInfos={docInfos} />
      </div>
    </div>
  );
}

export default Home;
