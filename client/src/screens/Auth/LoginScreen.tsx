import React, { useState } from "react";
import "./LoginScreen.css";
import UserNameIcon from "./../../assets/UserNameIcon.png";
import EmailIcon from "./../../assets/EmailIcon.png";
import PasswordIcon from "./../../assets/PasswordIcon.png";

const LoginScreen = () => {
  const [action, setAction] = useState("Registration");
  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img className="username-icon" src={UserNameIcon} alt="" />
          <input
            className="inputBox"
            type="text"
            placeholder="Please enter your name"
          />
        </div>
        <div className="input">
          <img className="email-icon" src={EmailIcon} alt="" />
          <input
            className="inputBox"
            type="email"
            placeholder="Please enter your email address"
          />
        </div>
        <div className="input">
          <img className="password-icon" src={PasswordIcon} alt="" />
          <input
            className="inputBox"
            type="password"
            placeholder="Please enter your password"
          />
        </div>
      </div>
      <div className="forget-password">
        Forget Password? <span>Click here</span>
      </div>
      <div className="submit-container">
        <div
          className={action === "Registration" ? "submit gray" : "submit"}
          onClick={() => {
            setAction("Login");
          }}
        >
          Login
        </div>
        <div
          className={action === "Login" ? "submit gray" : "submit"}
          onClick={() => {
            setAction("Registration");
          }}
        >
          Sign Up
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
