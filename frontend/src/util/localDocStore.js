import { getCurrentUser } from "./api/user_apis";

export const addLocalDocument = async (name, text, state) => {
  const userId = getCurrentUser();
  // todo: this only allows one path per document

  const hash = await fileStringHash(text);

  let docHashesString = localStorage.getItem(userId);
  const docHashes = docHashesString ? JSON.parse(docHashesString) : {};
  // todo: warning if we''re going to overwrite
  docHashes[hash] = { name: name, state: state };

  localStorage.setItem(userId, JSON.stringify(docHashes));
};

export const fileStringHash = async (text) => {
  const msgUint8 = new TextEncoder().encode(text); // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8); // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(""); // convert bytes to hex string
  return hashHex;
};
