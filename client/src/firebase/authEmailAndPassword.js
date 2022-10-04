import firebase from "./firebase-config";

import "firebase/compat/auth";

export const createUserEmailPassword = (email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      return userCredential.user;
    })
    .catch((err) => {
      return err;
    });
};

export const signInUserEmailPassword = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      return userCredential.user;
    })
    .catch((err) => {
      return err;
    });
};

export const signOutEmailPassword = (callback) => {
  return firebase
    .auth()
    .signOut()
    .then(() => {
      callback();
    })
    .catch((err) => {
      console.log(err);
    });
};
