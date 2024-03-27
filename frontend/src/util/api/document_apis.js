import FakeDocs from "@/util/test_documents";
import axios from "axios";
import { API_DOMAIN } from "../constants";
import localDocStore from "../localDocStore";

/*
    Gets all information on all docs
*/
const getAllDocs = () => {
  const localDocs = localDocStore.getLocalDocuments();
  const res = [...localDocs, ...FakeDocs];
  return res;
};

/*
    Gets ids, name, and dateLastModified (and other metadata) info about all docs
*/
const getAllDocsMetadata = () => {
  return getAllDocs().map((doc) => {
    var docMetadata = { ...doc };
    delete docMetadata["documentBody"];
    return docMetadata;
  });
  //Note: When backend is setup, this should only call the api and return doc metadata
};

/*
    Get full document given its id
*/
const getDocById = (id) => {
  return getAllDocs().find((e) => {
    return e.id == id;
  });
};

const postDoc = async (docText) => {
  const url = `http://${API_DOMAIN}/file/upload`;
  const config = {
    headers: {
      // Overwrite Axios's automatically set Content-Type
      "Content-Type": "application/json",
    },
  };

  let data;
  try {
    const resp = await axios.post(url, { text: docText }, config);
    data = resp.data;
  } catch (error) {
    console.log("Error uploading files: ", error);
  }

  return data;
};

const updateDoc = async (fileId, state) => {
  const url = `http://${API_DOMAIN}/file/update`;
  const config = {
    headers: {
      // Overwrite Axios's automatically set Content-Type
      "Content-Type": "application/json",
    },
  };

  let data;
  try {
    const resp = await axios.post(
      url,
      { fileId: fileId, state: state },
      config
    );
    data = resp.data;
  } catch (error) {
    console.log("Error uploading files: ", error);
  }

  return data;
};

const getDoc = async (fileId) => {
  const url = `http://${API_DOMAIN}/file`;
  const config = {
    params: {
      fileId: fileId,
    },
  };

  let data;
  try {
    const resp = await axios.get(url, config);
    data = resp.data;
  } catch (error) {
    console.log("Error uploading files: ", error);
  }

  return data;
};

export default {
  getDoc,
  updateDoc,
  postDoc,
  getAllDocs,
  getAllDocsMetadata,
  getDocById,
};
