const CURRENT_USER_ID = "abc";
export const getCurrentUser = () => {
  return CURRENT_USER_ID;
};

export const getUsersByIds = (userIds) => {
  return userIds.map((ui) => {
    return { name: "Soliyana", id: ui };
  });
};

export const getUserById = (userId) => {
  return getUsersByIds([userId])[0];
};
