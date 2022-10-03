export const isUserLoggedIn = () => {
  return window.localStorage.getItem("currentUser") ? true : false;
};

export const userInfo = () => {
  return JSON.parse(window.localStorage.getItem("currentUser"));
};
