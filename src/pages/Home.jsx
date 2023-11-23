import Navbar from "@/components/homepage/navbar/Navbar";
import DocFileIcon from "@/assets/home_doc_file_icon.svg";
import DocSortingIcon from "@/assets/home_doc_sorting_icon.svg";
import DocApi from "@/util/document_apis";
import Moment from 'moment';
import { Link } from "react-router-dom";

// import DocSortingExpandIcon from "@/assets/home_doc_sorting_expand_icon.svg";
// import Typography from '@mui/material/Typography';
// import Popover from '@mui/material/Popover';
// import { useState } from "react";


// const SortingDropDownMenu = (props) => {
//   return <div className={'flex flex-col bg-red-100 w-[100px] border-solid rounded ' + props.className}>
//     <div>1</div>
//     <div>2</div>
//     <div>3</div>
//   </div>
// }

// const DocumentsSelectionTopBar = () => {
//   const [anchorEl, setAnchorEl] = useState(null);

//   const handlePopoverOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handlePopoverClose = () => {
//     setAnchorEl(null);
//   };

//   const open = Boolean(anchorEl);

//   return <div className='pt-5'>
//     <div className='text-xl font-bold'>
//       <div className="flex flex-row"> 
//         <div>Documents</div>
//         <img src={DocSortingIcon} className="ml-5"/>
//         <Typography
//           aria-owns={open ? 'mouse-over-popover' : undefined}
//           aria-haspopup="true"
//           onMouseEnter={handlePopoverOpen}
//           // onMouseLeave={handlePopoverClose}
//         >
//           <img src={DocSortingExpandIcon}/>
//         </Typography>
//       </div>
//       <Popover
//         id="mouse-over-popover"
//         sx={{
//           pointerEvents: 'none',
//         }}
//         open={open}
//         anchorEl={anchorEl}
//         anchorOrigin={{
//           vertical: 'bottom',
//           horizontal: 'left',
//         }}
//         transformOrigin={{
//           vertical: 'top',
//           horizontal: 'left',
//         }}
//         onClose={handlePopoverClose}
//         onMouseLeave={handlePopoverClose}
//         disableRestoreFocus
//       >
//         <SortingDropDownMenu/>
//       </Popover>
//     </div>
//   </div>
// }

const DocumentsSelectionTopBar = () => {

  return <div className='pt-5'>
    <div className='text-xl font-bold'>
      <div className="flex flex-row"> 
        <div>Documents</div>
        <img src={DocSortingIcon} className="ml-5"/>
      </div>
    </div>
  </div>
}

const DocumentFileText = ({docInfo}) => {
  return <div className="flex flex-col h-14">
    <div className="flex-1 text-gray-600">
      {docInfo.name}
    </div>
    <div className="w-full text-right text-gray-400 text-xs">
      {Moment(docInfo.dateLastModified).format('MMM D, YYYY')}
    </div>
  </div>
}

const DocumentFile = ({docInfo}) => {
  return <Link to="/document">
    <div className="w-[200px] h-[200px] bg-gray-100 rounded-xl">
      <div className="flex flex-col p-2 divide-y divide-black">
        <img src={DocFileIcon} className="flex-1 w-[140px] m-auto"/>
        <DocumentFileText docInfo={docInfo}/>
      </div>
    </div>
  </Link>
}

const DocumentSelector = ({docInfos}) => {
  const docFiles = docInfos.map((docInfo) => { return <DocumentFile key={docInfo.id} docInfo={docInfo}/>})
  
  return <div className="flex flex-row flex-wrap p-2 mt-2 pt-5 gap-10">
    {docFiles} 
  </div>
}

const Home = () => {
  const docInfos = DocApi.getAllDocIdsAndMetadata()
  docInfos.sort((a, b) => a.dateLastModified < b.dateLastModified ? 1 : -1)

  return (
    <div className='flex flex-row'>
      <div className='w-[350px]'>
        <Navbar/>
      </div>
      <div className='flex-1 p-8 divide-y divide-black'>
        <DocumentsSelectionTopBar/>
        <DocumentSelector docInfos={docInfos}/>
      </div>
    </div>
  );
}

export default Home;
