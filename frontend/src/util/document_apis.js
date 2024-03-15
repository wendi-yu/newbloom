import AllDocs from "@/util/test_documents";
import axios from "axios";
import { API_DOMAIN } from "./constants";

/*
    Gets all information on all docs
*/
const getAllDocs = () => {
  return AllDocs;
};

/*
    Gets ids, name, and dateLastModified (and other metadata) info about all docs
*/
const getAllDocsMetadata = () => {
  return AllDocs.map((doc) => {
    var docMetadata = doc;
    delete docMetadata["body"];
    return docMetadata;
  });
  //Note: When backend is setup, this should only call the api and return doc metadata
};

/*
    Get full document given its id
*/
const getDocById = (id) => {
  return AllDocs.find((e) => {
    return e.id == id;
  });
};

const postDoc = async (docText) => {
  const url = `http://${API_DOMAIN}/upload`;
  const config = {
    headers: {
      // Overwrite Axios's automatically set Content-Type
      "Content-Type": "application/json",
    },
  };

  try {
    const resp = await axios.post(url, { text: docText }, config);
    console.log(resp.data);
  } catch (error) {
    console.log("Error uploading files: ", error);
  }
};

export default {
  postDoc,
  getAllDocs,
  getAllDocsMetadata,
  getDocById,
};
