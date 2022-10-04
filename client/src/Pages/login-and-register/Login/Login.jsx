import React, { useState, useEffect } from "react";
import FacebookButton from "../../../Components/login-and-register/FacebookButton";
import GoogleButton from "../../../Components/login-and-register/GoogleButton";

import { useDispatch } from "react-redux";

import "./Login.css";
import { signInUserEmailPassword } from "../../../firebase/authEmailAndPassword";
import { emailAndPasswordLogin } from "../../../actions/userActions";
import { isUserLoggedIn } from "../../../service/userService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const loginAuth = async (e) => {
    e.preventDefault();
    // TODO: make a checker the error code is auth/user-not-found or auth/wrong-password
    const res = await signInUserEmailPassword(email, password);
    if (res) {
      const user = {
        email: res.email,
        uid: res.uid,
      };
      dispatch(emailAndPasswordLogin(user));
    }
  };

  useEffect(() => {
    if (isUserLoggedIn()) {
      window.location.href = "/home";
    }
  }, []);

  return (
    <div className="h-screen grid md:grid-cols-1 lg:grid-cols-2">
      <div className="self-center justify-self-center">
        <h1>Welcome Back</h1>
        <h6 className="mt-3">Welcome back! Please enter your details.</h6>
        <form className="mt-10" onSubmit={loginAuth}>
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-xs font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              className=" border border-gray-300 text-gray-900 text-sm rounded-lg  w-full p-2.5"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-xs font-medium"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className=" border border-gray-300 text-gray-900 text-sm rounded-lg  w-full p-2.5"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-start mb-6">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
              />
            </div>
            <label
              htmlFor="remember"
              className="ml-2 text-sm font-medium text-gray-900 "
            >
              Remember me
            </label>
          </div>
          <button
            type="submit"
            className="text-white bg-orange-700 hover:bg-orange-600  font-medium rounded-md text-sm w-full sm:w-full px-5 py-2.5 text-center"
          >
            Submit
          </button>
        </form>
        <br />
        <GoogleButton type={2} />
        <FacebookButton type={2} />
      </div>
      <div className="hidden lg:block second-grid">LOGO</div>
    </div>
  );
};

export default Login;
