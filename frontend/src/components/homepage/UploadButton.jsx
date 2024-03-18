import AddIcon from "@/assets/add_round.svg";
import { useRef } from "react";
import DocApi from "@/util/api/document_apis";
import { addLocalDocument } from "@/util/localDocStore";
import { toSlateFormat } from "@/util/slateUtil";

const UploadButton = (props) => {
  const fileInput = useRef([]);

  const handleWithFile = async (event, f) => {
    // get text
    const text = event.target.result;

    // get redaction suggestions from text
    const redaction_suggestions = await DocApi.postDoc(text);

    // store file in local store
    const state = toSlateFormat(text, redaction_suggestions.redactions);
    addLocalDocument(f.name, text, state);
  };

  const processFiles = (e) => {
    const files = Array.from(e.target.files);
    console.log("uploading");

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        handleWithFile(e, file);
      };

      reader.readAsText(file);
    });
  };

  return (
    <div className={`hover:cursor-pointer ${props.className}`}>
      <input
        type="file"
        ref={fileInput}
        onChange={processFiles}
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
