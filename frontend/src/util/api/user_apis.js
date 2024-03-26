import localDocStore from "../localDocStore";

const CURRENT_USER_ID = "abc";
export const getCurrentUser = () => {
  return CURRENT_USER_ID;
};

export const getUsersByIds = (userIds) => {
  return userIds.map((ui) => {
    return { name: "Solyana", id: ui };
  });
};

export const getUserById = (userId) => {
  return getUsersByIds([userId])[0];
};

const DEFAULT_KEYBIND = {
  accept: "a",
  reject: "s",
  delete: "e",
  comment: "w",
  next: "tab",
  highlightRight: "o",
  highlightLeft: "i",
  undo: "z",
};

export const KEYBIND_DESCRIPTIONS = {
  accept: "accept",
  reject: "reject",
  delete: "remove suggestion",
  comment: "add comment",
  next: "focus next/previous",
  highlightRight: "highlight word left",
  highlightLeft: "highlight word right",
  undo: "undo/redo",
};

export const getUserKeyBinds = (display = true) => {
  const userId = getCurrentUser();
  const userKeyBind = localDocStore.getUserCustomKeyBind(userId) || {
    ...DEFAULT_KEYBIND,
  };
  if (display) {
    Object.keys(userKeyBind).forEach((key) => {
      userKeyBind[key] = [userKeyBind[key]];
    });

    userKeyBind.highlightLeft = ["⌘", ...userKeyBind.highlightLeft];
    userKeyBind.highlightRight = ["⌘", ...userKeyBind.highlightRight];

    userKeyBind.undo = ["⌘", ...userKeyBind.undo];
  }

  return userKeyBind;
};

export const saveUserKeyBinds = (newBinds) => {
  const userId = getCurrentUser();
  localDocStore.saveUserCustomKeyBind(userId, newBinds);
};
