import { getCurrentUser } from "./api/user_apis";

export const addLocalDocument = (name, id, state) => {
  const userId = getCurrentUser();
  // todo: this only allows one path per document

  let docHashesString = localStorage.getItem(userId);
  const docHashes = docHashesString ? JSON.parse(docHashesString) : {};
  // todo: warning if we''re going to overwrite
  docHashes[id] = { name: name, state: state, dateAdded: new Date() };

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
    };
  });
};
