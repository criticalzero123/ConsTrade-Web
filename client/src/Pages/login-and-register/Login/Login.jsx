import React, { useState, useEffect } from "react";
// import FacebookButton from "../../../Components/login-and-register/FacebookButton";
import GoogleButton from "../../../Components/login-and-register/GoogleButton";

import { useDispatch } from "react-redux";

import { signInUserEmailPassword } from "../../../firebase/authEmailAndPassword";
import { emailAndPasswordLogin } from "../../../actions/userActions";
import { isUserLoggedIn } from "../../../service/userService";

import logo from "../../../Assets/Images/Branding/Web/SVG/IconWeb.svg";
import coverlogo from "../../../Assets/Images/sign-up-and-in/login1.svg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const loginAuth = async (e) => {
    e.preventDefault();
    // TODO: make a checker the error code is auth/user-not-found or auth/wrong-password
    const res = await signInUserEmailPassword(email, password);
    if (res.uid !== undefined) {
      const user = {
        email: res.email,
        uid: res.uid,
      };
      dispatch(emailAndPasswordLogin(user));
    } else {
      alert("Something went wrong loging in with email and password");
      // error
    }
  };

  useEffect(() => {
    if (isUserLoggedIn()) {
      window.location.href = "/home";
    }
  }, []);

  return (
    <div className=" h-screen ">
      <div className=" grid md:grid-cols-1 lg:grid-cols-2 h-5/6 ">
        <div className="self-center justify-self-center w-3/4 sm:w-1/2">
          <img
            src={logo}
            alt="logo"
            className="w-24 mx-auto hover:animate-bounce mb-5 block lg:hidden drop-shadow-[0px_10px_35px_rgba(0,0,0,0.7)]"
          />

          <h1 className="font-semibold text-4xl text-center">Welcome back</h1>
          <h6 className="mt-3 text-sm text-gray-500 text-center">
            Please enter your details.
          </h6>
          <form className="mt-10" onSubmit={loginAuth}>
            <div className="mb-6">
              <input
                type="email"
                className=" border border-gray-300 text-gray-900 text-sm rounded-lg  w-full p-2.5"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                placeholder="Enter your password"
                className=" border border-gray-300 text-gray-900 text-sm rounded-lg  w-full p-2.5"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex mb-6 justify-between">
              <div className=" flex ">
                <div className=" flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 "
                  />
                </div>
                <label
                  htmlFor="remember"
                  className="ml-2 text-sm font-medium text-gray-700 "
                >
                  Remember me
                </label>
              </div>
              <p className="text-sm font-semibold text-[#6F769F] hover:text-[#283270] cursor-pointer">
                Forgot password
              </p>
            </div>
            <button
              type="submit"
              className="text-white bg-orange-800 hover:bg-orange-700 font-medium rounded-md shadow-2xl text-sm w-full sm:w-full px-5 py-2.5 text-center"
            >
              Sign in
            </button>
          </form>
          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <GoogleButton type={2} />
          <p className="mt-10 text-center text-gray-400">
            Don't have an account?{" "}
            <span
              onClick={() => (window.location.href = "/register")}
              className="text-[#283270] font-semibold cursor-pointer hover:text-orange-400"
            >
              Sign up
            </span>
          </p>
          {/* <FacebookButton type={2} /> */}
        </div>
        <div className="hidden lg:block  rounded-l-3xl ">
          <div className="flex items-center justify-center h-full relative">
            <img
              src={logo}
              alt="cover-logo1"
              className="absolute w-1/4 top-1/3 animate-bounce drop-shadow-[0px_10px_20px_rgba(0,0,0,0.5)]"
            />
            <img src={coverlogo} alt="cover-logo" className="rounded-l-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
