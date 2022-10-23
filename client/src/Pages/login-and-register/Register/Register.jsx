import React, { useState, useEffect } from "react";
// import FacebookButton from "../../../Components/login-and-register/FacebookButton";
import GoogleButton from "../../../Components/login-and-register/GoogleButton";
import InputEmail from "../../../Components/login-and-register/InputEmail";
import InputPassword from "../../../Components/login-and-register/InputPassword";

import { useDispatch } from "react-redux";
import { createUserEmailPassword } from "../../../firebase/authEmailAndPassword";
import { emailAndPasswordRegister } from "../../../actions/userActions";
import { isUserLoggedIn } from "../../../service/userService";
import InputName from "../../../Components/login-and-register/InputName";
import logo from "../../../Assets/Branding/Web/SVG/IconWeb.svg";
import cover1 from "../../../Assets/sign-up-and-in/coversign.png";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");

  // for the errors
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const [showEmailPassword, setShowEmailPassword] = useState(false);
  const [emailError, setEmailError] = useState("");

  const dispatch = useDispatch();

  const loginCredential = async (e) => {
    e.preventDefault();
    setShowPasswordError(false);
    setShowEmailPassword(false);

    if (password === confirmPassword) {
      // TODO: CHECK FOR THE LOG FOR THE ERROR OF PASSWORD WEAK AND USER EXIST TO PROMPT ERROR
      // TIPS: ERROR.CODE FOR THE MESSAGE NAME
      const res = await createUserEmailPassword(email, password);
      if (res.uid !== undefined) {
        const data = {
          name: name,
          email: res.email,
          uid: res.uid,
          emailVerified: res.emailVerified,
        };

        dispatch(emailAndPasswordRegister(data));
      } else {
        if (res === "auth/weak-password") {
          setShowPasswordError(true);
          setPasswordError(
            "The password is weak. Please Input more than 6 characters"
          );
        }
        if (res === "auth/email-already-in-use") {
          setShowEmailPassword(true);
          setEmailError("Email alreay in use.");
        }
      }
    } else {
      setShowPasswordError(true);
      setPasswordError("The password is not the same");
    }
  };

  useEffect(() => {
    if (isUserLoggedIn()) {
      window.location.href = "/home";
    }
  }, []);

  const errorPasswordMessage = () => {
    return (
      <p
        className={`mt-2  text-sm text-red-600 dark:text-red-500 ${
          showPasswordError ? "block" : "hidden"
        }`}
      >
        {passwordError}
      </p>
    );
  };

  const errorEmailMessage = () => {
    return (
      <p
        className={`mt-2  text-sm text-red-600 dark:text-red-500 ${
          showEmailPassword ? "block" : "hidden"
        }`}
      >
        {emailError}
      </p>
    );
  };

  return (
    <div className="h-screen">
      <div className="grid lg:grid-cols-2 h-5/6 ">
        <div className="hidden lg:block  place-self-center">
          <img src={cover1} alt="cover" className="rounded-xl" />
        </div>
        <div className="md:w-1/2 mt-7 lg:mt-0 justify-self-center">
          <img
            src={logo}
            alt="logo"
            className="w-24 mx-auto hover:animate-bounce mb-5 drop-shadow-[0px_10px_35px_rgba(0,0,0,0.7)]"
          />
          <h1 className="text-4xl text-center font-semibold">
            Create your account
          </h1>
          <h3 className="text-base text-gray-400 text-center mt-3 mb-10">
            Enter the fields below to get started
          </h3>

          <GoogleButton type={1} />

          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <form onSubmit={loginCredential}>
            <InputName
              onChange={(e) => setName(e.target.value)}
              textname="Name"
            />
            <InputEmail onChange={(e) => setEmail(e.target.value)} />
            {errorEmailMessage()}
            <InputPassword
              text={"Password"}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errorPasswordMessage()}
            <InputPassword
              text={"Confirm Password"}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errorPasswordMessage()}
            <button className="w-full mt-10  p-3 rounded-lg bg-[#283270] hover:bg-[#383f68] font-semibold cursor-pointer text-white">
              Sign up
            </button>
            <p className="mt-10 text-center text-gray-400">
              Already have an account?{" "}
              <span
                onClick={() => (window.location.href = "/signin")}
                className="text-[#283270] font-semibold cursor-pointer hover:text-orange-400"
              >
                Sign in
              </span>
            </p>
          </form>
          {/* <FacebookButton type={1} /> */}
        </div>
      </div>
    </div>
  );
};

export default Register;
