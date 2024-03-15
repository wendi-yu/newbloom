import AddIcon from "@/assets/add_round.svg";
import { useRef } from "react";
import DocApi from "@/util/document_apis";

const UploadButton = (props) => {
  const fileInput = useRef([]);

  const processFile = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = function (event) {
        // The file's text will be printed here
        const text = event.target.result;
        DocApi.postDoc(text);
      };

      reader.readAsText(file);
    });
  };

  return (
    <div className={`hover:cursor-pointer ${props.className}`}>
      <input
        type="file"
        ref={fileInput}
        onChange={processFile}
        multiple
        accept=".txt,.docx,.doc"
        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer text-[0]"
      />
      <button
        className={`bg-primary-light flex space-x-2 text-white items-center border-warning hover:border-white`}
      >
        <img src={AddIcon} className="h-8" />
        <div className="pr-2">Upload</div>
      </button>
    </div>
  );
};

export default UploadButton;
