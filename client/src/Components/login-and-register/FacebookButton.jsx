import React from "react";
import socialMediaAuth from "../../firebase/authSocialMedia";
import { facebookProvider } from "../../firebase/authMethod";

import { socialMediaMethod } from "../../actions/userActions";
import { useDispatch } from "react-redux";

const FacebookButton = ({ type }) => {
  const _authType = type === 1 ? "Register" : "Login";

  const dispatch = useDispatch();

  const FacebookAuth = async () => {
    const res = await socialMediaAuth(facebookProvider);

    if (res.uid !== undefined) {
      const data = {
        authType: type,
        name: res.displayName,
        email: res.email,
        uid: res.uid,
        emailVerified: res.emailVerified,
        imagePhotoURL: res.photoURL,
      };

      dispatch(socialMediaMethod(data));
    } else {
      alert("Something went wrong facebook auth");
    }
  };

  return (
    <div>
      <button
        onClick={FacebookAuth}
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      >
        {_authType} With Facebook
      </button>
    </div>
  );
};

export default FacebookButton;
