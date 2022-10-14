import React from "react";
import { useDispatch } from "react-redux";

import { socialMediaMethod } from "../../actions/userActions";
import socialMediaAuth from "../../firebase/authSocialMedia";

import { googleProvider } from "../../firebase/authMethod";
import { FcGoogle } from "react-icons/fc";

const GoogleButton = ({ type }) => {
  const _authType = type === 1 ? "Register" : "Login";

  const dispatch = useDispatch();

  const GoogleAuth = async () => {
    const res = await socialMediaAuth(googleProvider);

    if (res.uid) {
      const data = {
        authType: type,
        name: res.displayName,
        email: res.email,
        uid: res.uid,
        imagePhotoURL: res.photoURL,
        emailVerified: res.emailVerified,
      };

      dispatch(socialMediaMethod(data));
    } else {
      // alert("Something went wrong in google auth");
      // error
    }
  };

  return (
    <div className="">
      <button
        onClick={GoogleAuth}
        className="flex justify-center place-items-center w-full bg-transparent hover:border-orange-700 
         text-gray-700 font-semibold  py-2 px-4 border   hover:text-orange-700 
        border-gray-700 hover:border-transparent rounded hover:shadow-[0_0px_50px_-15px_rgba(0,0,0,0.8)] hover:shadow-orange-400"
      >
        <FcGoogle size={30} className="mr-3" />{" "}
        <span>{_authType} with Google</span>
      </button>
    </div>
  );
};

export default GoogleButton;
