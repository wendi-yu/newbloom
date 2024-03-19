import Navbar from "@/components/homepage/navbar/Navbar";
import DocSortingIcon from "@/assets/home_doc_sorting_icon.svg";
import DocApi from "@/util/api/document_apis";
import GridSelector from "@/components/homepage/doc_selectors/GridSelector";

import DocSortingExpandedIcon from "@/assets/home_doc_sorting_expand_icon.svg";
import DocSortingExpandIcon from "@/assets/expand_right.svg";
import { Popover } from "antd";
import { useReducer, useState } from "react";
import Clickable from "@/components/common/Clickable";

import { Radio } from "antd";
import ListIcon from "@/assets/list.svg";
import GridIcon from "@/assets/grid.svg";
import ListSelector from "@/components/homepage/doc_selectors/ListSelector";
import UploadButton from "@/components/homepage/UploadButton";

const SORTING_OPTIONS = {
  name: "name",
  date: "dateLastModified",
  file: "file_type",
};

const HOMEPAGE_DOC_LAYOUTS = {
  list: "list",
  grid: "grid",
};

const DocumentsSelectionTopBar = ({
  updateDisplay,
  docLayout,
  setDocLayout,
}) => {
  const [selectedSortKey, setselectedSortKey] = useState(SORTING_OPTIONS.name);

  const SortingDropDownMenu = ({ selectedSortKey, setselectedSortKey }) => {
    const sortDisplay = [
      { name: "Name", key: SORTING_OPTIONS.name },
      { name: "Date Uploaded", key: SORTING_OPTIONS.date },
      { name: "File Type", key: SORTING_OPTIONS.file },
    ];
    return (
      <div
        className={
          "flex flex-col items-start p-2 divide-y divide-black m-[-12px]"
        }
      >
        {sortDisplay.map((so) => {
          return (
            <Clickable
              key={so.key}
              className={`text-left w-full p-0.5 px-2 ${
                selectedSortKey === so.key
                  ? "bg-background-primary"
                  : "bg-white"
              }`}
              onClick={() => {
                updateDisplay({ newSortKey: so.key });
                setselectedSortKey(so.key);
              }}
            >
              {so.name}
            </Clickable>
          );
        })}
      </div>
    );
  };

  const [open, setOpen] = useState(false);

  return (
    <div className="p-5">
      <div className="text-xl font-bold">
        <div className="flex flex-row items-center">
          <div className="text-3xl">Documents</div>
          <Popover
            className="flex flex-row bg-white items-center justify-between"
            content={
              <SortingDropDownMenu
                setselectedSortKey={setselectedSortKey}
                selectedSortKey={selectedSortKey}
              />
            }
            trigger="click"
            placement="bottomRight"
            onOpenChange={() => {
              setOpen(!open);
            }}
          >
            <div>
              <img src={DocSortingIcon} className="ml-5 w-8" />
              <img
                src={open ? DocSortingExpandedIcon : DocSortingExpandIcon}
                className="stroke-black w-8"
              />
            </div>
          </Popover>
          <div className="flex flex-row-reverse w-full my-2">
            <Radio.Group
              optionType="button"
              size="large"
              value={docLayout}
              options={[
                {
                  label: <img src={GridIcon} className="m-2" />,
                  value: HOMEPAGE_DOC_LAYOUTS.grid,
                },
                {
                  label: <img src={ListIcon} className="m-2" />,
                  value: HOMEPAGE_DOC_LAYOUTS.list,
                },
              ]}
              onChange={({ target: { value } }) => {
                setDocLayout(value);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const docInfosRaw = DocApi.getAllDocsMetadata();

  const sorter = (docs, key) => {
    return [...docs].sort((d1, d2) => {
      const f1 = d1[key];
      const f2 = d2[key];

      if (f1 < f2) return -1;
      if (f1 > f2) return 1;
      return 0;
    });
  };

  // state management for customizing sort key
  const updater = (currentDocInfos, action) => {
    if (action.docChange) {
      return {
        ...currentDocInfos,
        docs: sorter(DocApi.getAllDocsMetadata(), currentDocInfos.key),
      };
    }
    if (action.newSortKey) {
      const sortedDocs = sorter([...currentDocInfos.docs], action.newSortKey);
      return {
        ...currentDocInfos,
        key: action.newSortKey,
        docs: sortedDocs,
      };
    }
    return currentDocInfos;
  };
  const [docState, updateDisplay] = useReducer(updater, {
    key: SORTING_OPTIONS.name,
    docs: sorter(docInfosRaw, SORTING_OPTIONS.name),
  });

  // state management for which layout to display
  const [docLayout, setDocLayout] = useState(HOMEPAGE_DOC_LAYOUTS.grid);

  return (
    <div className="flex flex-row">
      <Navbar />
      <div className="ml-80 flex-1 p-8 divide-y divide-black w-full">
        <DocumentsSelectionTopBar
          updateDisplay={updateDisplay}
          docLayout={docLayout}
          setDocLayout={setDocLayout}
        />
        {docLayout == HOMEPAGE_DOC_LAYOUTS.grid ? (
          <GridSelector docInfos={docState.docs} />
        ) : (
          <ListSelector docInfos={docState.docs} />
        )}
      </div>
      <UploadButton
        className="fixed bottom-10 right-10"
        onLocalDocUpdate={() => {
          updateDisplay({ docChange: true });
        }}
      />
    </div>
  );
};

export default Home;
