import React from "react";
import { useDispatch } from "react-redux";

import { socialMediaMethod } from "../../actions/userActions";
import socialMediaAuth from "../../firebase/authSocialMedia";

import { googleProvider } from "../../firebase/authMethod";

const GoogleButton = ({ type }) => {
  const _authType = type === 1 ? "Register" : "Login";

  const dispatch = useDispatch();

  const GoogleAuth = async () => {
    const res = await socialMediaAuth(googleProvider);

    const data = {
      authType: type,
      name: res.displayName,
      email: res.email,
      uid: res.uid,
      imagePhotoURL: res.photoURL,
      emailVerified: res.emailVerified,
    };

    dispatch(socialMediaMethod(data));
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
