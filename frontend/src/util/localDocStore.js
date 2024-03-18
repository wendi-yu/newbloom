import { getCurrentUser } from "./api/user_apis";

export const addLocalDocument = async (name, id, state) => {
  const userId = getCurrentUser();
  // todo: this only allows one path per document

  let docHashesString = localStorage.getItem(userId);
  const docHashes = docHashesString ? JSON.parse(docHashesString) : {};
  // todo: warning if we''re going to overwrite
  docHashes[id] = { name: name, state: state };

  localStorage.setItem(userId, JSON.stringify(docHashes));
};
