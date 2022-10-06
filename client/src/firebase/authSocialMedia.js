import firebase from "./firebase-config";

const socialMediaAuth = (provider) => {
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((res) => {
      // TODO: incase for additional field in users in mongodb
      return res.user;
    })
    .catch((err) => {
      return err;
    });
};

export default socialMediaAuth;

// signInWithPopup(auth, googleProvider)
//   .then((result) => {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     // const credential = GoogleAuthProvider.credentialFromResult(result);
//     // const token = credential.accessToken;
//     // The signed-in user info.
//     const user = result.user;
//     // ...
//     // type 1=register / 2=login

//     const data = {
//       authType: type,
//       name: user.displayName,
//       email: user.email,
//       uid: user.uid,
//     };

//     dispatch(googleAuth(data));
//   })
//   .catch((error) => {
//     // Handle Errors here.
//     // const errorCode = error.code;
//     // const errorMessage = error.message;
//     // The email of the user's account used.
//     // const email = error.customData.email;
//     // The AuthCredential type that was used.
//     // const credential = GoogleAuthProvider.credentialFromError(error);
//     console.log(error);
//   });
