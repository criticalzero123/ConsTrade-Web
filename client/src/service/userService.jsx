export const isUserLoggedIn = () => {
  return window.localStorage.getItem("currentUser") ? true : false;
};

export const userInfo = () => {
  return JSON.parse(window.localStorage.getItem("currentUser"));
};

export const firstLetterUpper = (name) => {
  const letterSplit = name.split(" ");

  let finalWord = "";

  for (var i = 0; i < letterSplit.length; i++) {
    finalWord +=
      letterSplit[i].charAt(0).toUpperCase() + letterSplit[i].slice(1) + " ";
  }

  return finalWord;
};
