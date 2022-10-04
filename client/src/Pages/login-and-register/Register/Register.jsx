import React, { useState, useEffect } from "react";
import FacebookButton from "../../../Components/login-and-register/FacebookButton";
import GoogleButton from "../../../Components/login-and-register/GoogleButton";
import InputEmail from "../../../Components/login-and-register/InputEmail";
import InputPassword from "../../../Components/login-and-register/InputPassword";

import { useDispatch } from "react-redux";
import { createUserEmailPassword } from "../../../firebase/authEmailAndPassword";
import { emailAndPasswordRegister } from "../../../actions/userActions";
import { isUserLoggedIn } from "../../../service/userService";
import InputName from "../../../Components/login-and-register/InputName";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const loginCredential = async (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      // TODO: CHECK FOR THE LOG FOR THE ERROR OF PASSWORD WEAK AND USER EXIST TO PROMPT ERROR
      // TIPS: ERROR.CODE FOR THE MESSAGE NAME
      const res = await createUserEmailPassword(email, password);
      if (res) {
        const data = {
          name: name,
          email: res.email,
          uid: res.uid,
          emailVerified: res.emailVerified,
        };

        dispatch(emailAndPasswordRegister(data));
      }
    } else {
      alert("Password is not the same!");
    }
  };

  useEffect(() => {
    if (isUserLoggedIn()) {
      window.location.href = "/home";
    }
  }, []);

  return (
    <div>
      <form onSubmit={loginCredential}>
        <InputName onChange={(e) => setName(e.target.value)} textname="Name" />
        <InputEmail onChange={(e) => setEmail(e.target.value)} />
        <InputPassword
          text={"Password"}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputPassword
          text={"Confirm Password"}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button>Submit</button>
      </form>
      <br />
      <hr />
      <br />
      <GoogleButton type={1} />
      <FacebookButton type={1} />
    </div>
  );
};

export default Register;
