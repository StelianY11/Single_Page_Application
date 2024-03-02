function getUserData() {
  return JSON.parse(sessionStorage.getItem("userData"));
}

function setUserData(data) {
  sessionStorage.setItem("userData", JSON.stringify(data));
}

function getUserId() {
  const userData = getUserData();
  return userData._id;
}

function removeUserData() {
  sessionStorage.removeItem("userData");
}

export const userHelper = {
  getUserData,
  setUserData,
  getUserId,
  removeUserData,
};
