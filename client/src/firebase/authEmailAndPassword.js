import firebase from "./firebase-config";

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

export const signOutEmailPassword = () => {
  return firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("SignOut Successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};
