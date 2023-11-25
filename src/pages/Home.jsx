import Navbar from "@/components/homepage/navbar/Navbar";
import DocSortingIcon from "@/assets/home_doc_sorting_icon.svg";
import DocApi from "@/util/document_apis";
import GridSelector from "@/components/homepage/doc_selectors/GridSelector"

import DocSortingExpandedIcon from "@/assets/home_doc_sorting_expand_icon.svg";
import DocSortingExpandIcon from "@/assets/expand_right.svg"
import Popover from '@mui/material/Popover';
import { useReducer, useState } from "react";
import Clickable from "@/components/common/Clickable";
import { HOMEPAGE_DOC_LAYOUTS, SORTING_OPTIONS } from "../util/constants";

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ListIcon from "@/assets/list.svg"
import GridIcon from "@/assets/grid.svg"
import ListSelector from "../components/homepage/doc_selectors/ListSelector";


const DocumentsSelectionTopBar = ({ resort, docLayout, setDocLayout }) => {
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
        <div className="flex flex-row-reverse w-full my-2">
          <ToggleButtonGroup
            size="small"
            value={docLayout}
            exclusive
            onChange={(e, layout) => {
              if (layout != null) {
                setDocLayout(layout)
              }
            }}
            aria-label="doc-layout"
          >
            <ToggleButton value={HOMEPAGE_DOC_LAYOUTS.grid}>
              <img src={GridIcon} />
            </ToggleButton>
            <ToggleButton value={HOMEPAGE_DOC_LAYOUTS.list}>
              <img src={ListIcon} />
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
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

const Home = () => {
  const docInfosRaw = DocApi.getAllDocIdsAndMetadata()

  // state management for customizing sort key
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

  // state management for which layout to display
  const [docLayout, setDocLayout] = useState(HOMEPAGE_DOC_LAYOUTS.grid)

  return (
    <div className='flex flex-row'>
      <Navbar />
      <div className='ml-80 flex-1 p-8 divide-y divide-black w-full'>
        <DocumentsSelectionTopBar resort={resort} docLayout={docLayout} setDocLayout={setDocLayout} />
        {docLayout == HOMEPAGE_DOC_LAYOUTS.grid ? <GridSelector docInfos={docInfos} /> : <ListSelector docInfos={docInfos} />}
      </div>
    </div>
  );
}

export default Home;
