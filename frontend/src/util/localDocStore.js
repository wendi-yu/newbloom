import { getCurrentUser } from "./api/user_apis";

export const addDocument = (name, id, state) => {
  const userId = getCurrentUser();
  // todo: this only allows one path per document

  let docHashesString = localStorage.getItem(userId);
  const docHashes = docHashesString ? JSON.parse(docHashesString) : {};
  // todo: warning if we''re going to overwrite
  docHashes[id] = { name: name, state: state, dateAdded: new Date(), comments };

  localStorage.setItem(userId, JSON.stringify(docHashes));
};

export const updateDocumentBody = (docId, state) => {
  const userId = getCurrentUser();

  let docHashesString = localStorage.getItem(userId);
  if (!docHashesString) {
    console.error(`document ${docId} not found`);
    return;
  }

  const docHashes = JSON.parse(docHashesString);

  docHashes[docId].state = state;

  localStorage.setItem(userId, JSON.stringify(docHashes));
};

export const addCommentToDocument = (docId, newComment) => {
  const userId = getCurrentUser();

  let docHashesString = localStorage.getItem(userId);
  if (!docHashesString) {
    console.error(`document ${docId} not found`);
    return;
  }

  const docHashes = JSON.parse(docHashesString);
  const document = docHashes[docId];

  if (!document.comments) {
    document.comments = [];
  }

  document.comments.push(newComment);
  localStorage.setItem(userId, JSON.stringify(docHashes));

};

export const getAllCommentsFromDoc = (docId) => {
  const userId = getCurrentUser();

  let docHashesString = localStorage.getItem(userId);
  if (!docHashesString) {
    console.error(`document ${docId} not found`);
    return;
  }

  const docHashes = JSON.parse(docHashesString);
  const document = docHashes[docId];

  if(!document.comments) return null;
  return document.comments;
}

export const deleteCommentFromDocument = (docId, commentId) => {

  const userId = getCurrentUser();

  let docHashesString = localStorage.getItem(userId);
  if (!docHashesString) {
    console.error(`document ${docId} not found`);
    return;
  }

  const docHashes = JSON.parse(docHashesString);
  const document = docHashes[docId];

  if (!document) {
    return
  }

  if (!document.comments) {
    console.error(`No comments to delete in document ${docId}`);
    return;
  }

  const updatedComments = document.comments.filter(comment => comment.id !== commentId);
  document.comments = updatedComments;

  localStorage.setItem(userId, JSON.stringify(docHashes));
};

export const getLocalDocuments = () => {
  const userId = getCurrentUser();
  const documents = JSON.parse(localStorage.getItem(userId));

  if (!documents) return [];

  return Object.keys(documents).map((hash) => {
    const obj = documents[hash];
    return {
      id: hash,
      name: obj.name,
      dateAdded: obj.dateAdded,
      dateLastModified: obj.dateAdded,
      owner: userId,
      documentBody: obj.state,
      comments: obj.comments || [],
    };
  });
};

export default {
  addDocument,
  updateDocumentBody,
  getLocalDocuments,
};
