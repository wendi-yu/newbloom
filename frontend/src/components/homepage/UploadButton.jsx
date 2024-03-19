import AddIcon from "@/assets/add_round.svg";
import { useRef, useState } from "react";
import DocApi from "@/util/api/document_apis";
import { addLocalDocument } from "@/util/localDocStore";
import { toSlateFormat } from "@/util/slateUtil";
import { Grid } from "react-loader-spinner";

const UploadButton = (props) => {
  const fileInput = useRef([]);
  const [loading, setLoading] = useState(0);

  const handleWithFile = async (event, f) => {
    // get text
    const text = event.target.result;

    // get redaction suggestions from text
    const res = await DocApi.postDoc(text);

    // store file in local store
    const state = toSlateFormat(text, res.redactions);
    addLocalDocument(f.name, res.id, state);
    props.onLocalDocUpdate();
  };

  const processFiles = (e) => {
    const files = Array.from(e.target.files);
    setLoading(files.length);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = async (e) => {
        await handleWithFile(e, file);
        setLoading(Math.max(loading - 1, 0));
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
        {loading > 0 ? (
          <div className="p-2 ">
            <Grid height="16" width="16" color="white" />
          </div>
        ) : (
          <img src={AddIcon} className="h-8" />
        )}
        <div className="pr-2">Upload</div>
      </button>
    </div>
  );
};

export default UploadButton;
