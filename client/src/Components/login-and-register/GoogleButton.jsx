import React from "react";
import { useDispatch } from "react-redux";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { googleAuth } from "../../actions/userActions";

const GoogleButton = ({ type }) => {
  const provider = new GoogleAuthProvider();
  const _authType = type === 1 ? "Register" : "Login";

  const dispatch = useDispatch();

  const GoogleAuth = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
        // type 1=register / 2=login

        const data = {
          authType: type,
          name: user.displayName,
          email: user.email,
          uid: user.uid,
        };

        dispatch(googleAuth(data));
      })
      .catch((error) => {
        // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.customData.email;
        // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(error);
      });
  };

  return (
    <div>
      <button
        onClick={GoogleAuth}
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      >
        {_authType} With Google
      </button>
    </div>
  );
};

export default GoogleButton;
