import React from "react";
import "./LoginScreen.css";
import UserNameIcon from "./../../assets/UserNameIcon.png";
import EmailIcon from "./../../assets/EmailIcon.png";
import PasswordIcon from "./../../assets/PasswordIcon.png";

const LoginScreen = () => {
  return (
    <div className="container">
      <div className="header">
        <div className="text">Registration</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img className="username-icon" src={UserNameIcon} alt="" />
          <input type="text" placeholder="Please write your name" />
        </div>
        <div className="input">
          <img className="email-icon" src={EmailIcon} alt="" />
          <input type="email" placeholder="Please write your email address" />
        </div>
        <div className="input">
          <img className="password-icon" src={PasswordIcon} alt="" />
          <input type="password" placeholder="Please write your password" />
        </div>
      </div>
      <div className="forget-password">
        Forget Password? <span>Click here</span>
      </div>
      <div className="submit-container">
        <div className="submit">Sign Up</div>
        <div className="submit">Login</div>
      </div>
    </div>
  );
};

export default LoginScreen;
