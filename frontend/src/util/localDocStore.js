import { getCurrentUser } from "./api/user_apis";

const addDocument = (name, id, state) => {
  const userId = getCurrentUser();
  // todo: this only allows one path per document

  let docHashesString = localStorage.getItem(userId);
  const docHashes = docHashesString ? JSON.parse(docHashesString) : {};
  // todo: warning if we''re going to overwrite
  docHashes[id] = { name: name, state: state, dateAdded: new Date(), comments:[] };

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
  docHashes[docId].state = state;

  localStorage.setItem(userId, JSON.stringify(docHashes));
};

const getLocalDocuments = () => {
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
