import { getCurrentUser } from "./api/user_apis";

const tempDocID = "d02dd6a363df05a1ded4aa8150c58d62d7baf0396bfc66a1dd38efa98cf00072"

const addDocument = (name, id, state) => {
  const userId = getCurrentUser();
  // todo: this only allows one path per document

  let docHashesString = localStorage.getItem(userId);
  const docHashes = docHashesString ? JSON.parse(docHashesString) : {};
  // todo: warning if we''re going to overwrite
  docHashes[id] = {
    name: name,
    state: state,
    dateAdded: new Date(),
    comments: [],
  };

  localStorage.setItem(userId, JSON.stringify(docHashes));
};

const updateDocumentBody = (docId, state) => {
  const userId = getCurrentUser();

  let docHashesString = localStorage.getItem(userId);
  
  if (!docHashesString) {
    console.error(`document ${docId} not found`);
    return;
  }

  const docHashes = JSON.parse(docHashesString);
  docHashes[docID].state = state;

  localStorage.setItem(userId, JSON.stringify(docHashes));
};

export const addCommentToDocument = (docId, newComment, parentId=null) => {
  const userId = getCurrentUser();

  let docHashesString = localStorage.getItem(userId);
  if (!docHashesString) {
    console.error(`document ${docId} not found`);
    return;
  }

  const docHashes = JSON.parse(docHashesString);
  const document = docHashes[docID];

  if (!document.comments) {
    document.comments = [];
  }

  //checks if comment is a response
  if (parentId) {
    const parentComment = document.comments.find(comment => comment.id === parentId);
    if (parentComment) {
      if (!parentComment.replies) parentComment.replies = [];
      parentComment.replies.push(newComment);
    } else {
      console.error(`Parent comment ${parentId} not found`);
    }
  } else {
    document.comments.push(newComment);
  }

  console.log(document.comments)

  localStorage.setItem(userId, JSON.stringify(docHashes));
};

export const setDocumentComments = (docId, comments) => {
  const userId = getCurrentUser();

  let docHashesString = localStorage.getItem(userId);
  if (!docHashesString) {
    console.error(`document ${docId} not found`);
    return;
  }

  const docHashes = JSON.parse(docHashesString);
  docHashes[docId].comments = comments;

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
  const document = docHashes[docID];

  if (!document || !document.comments) return null;
  return document.comments;
};

export const deleteCommentFromDocument = (docId, commentId) => {
  const userId = getCurrentUser();

  let docHashesString = localStorage.getItem(userId);
  if (!docHashesString) {
    console.error(`document ${docId} not found`);
    return;
  }

  const docHashes = JSON.parse(docHashesString);
  const document = docHashes[docID];

  if (!document) {
    return;
  }

  if (!document.comments) {
    console.error(`No comments to delete in document ${docId}`);
    return;
  }

  const updatedComments = document.comments.filter(
    (comment) => comment.id !== commentId
  );
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

const KEYBINDS_KEY = "keyBinds";

const getUserCustomKeyBind = (userId) => {
  const keybindsString = localStorage.getItem(KEYBINDS_KEY);
  const keyBinds = keybindsString ? JSON.parse(keybindsString) : {};
  return keyBinds[userId];
};

const saveUserCustomKeyBind = (userId, newKeyBinds) => {
  const keybindsString = localStorage.getItem(KEYBINDS_KEY);
  const keyBinds = keybindsString ? JSON.parse(keybindsString) : {};
  keyBinds[userId] = newKeyBinds;

  localStorage.setItem(KEYBINDS_KEY, JSON.stringify(keyBinds));
};

export default {
  saveUserCustomKeyBind,
  addDocument,
  updateDocumentBody,
  getLocalDocuments,
  getUserCustomKeyBind,
};
