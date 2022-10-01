import React, { useState } from "react";
import FacebookButton from "../../../Components/login-and-register/FacebookButton";
import GoogleButton from "../../../Components/login-and-register/GoogleButton";
import InputEmail from "../../../Components/login-and-register/InputEmail";
import InputPassword from "../../../Components/login-and-register/InputPassword";

const Register = () => {
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <form>
        <InputEmail onChange={(e) => setEmail(e.target.value)} />
        <InputPassword
          text={"Password"}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputPassword
          text={"Confirm Password"}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
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
