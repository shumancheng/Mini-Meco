import { useState } from "react";
import "./LoginScreen.css";
import EmailIcon from "./../../assets/EmailIcon.png";
import PasswordIcon from "./../../assets/PasswordIcon.png";

const ResetPassword = () => {
  return (
    <>
      <div className="container">
        <div className="header">
          <div className="text">Forgot Your Password</div>
          <br></br>
          <div className="underline"></div>
        </div>
        <div className="text ForgotPasswordText">
          Enter your email address and
          <br /> we will send you a link to reset your password
        </div>
        <div className="inputs">
          <div className="input">
            <img className="password-icon" src={PasswordIcon} alt="" />
            <input
              className="inputBox"
              type="password"
              placeholder="Enter New Password"
            />
          </div>
        </div>
        \
        <div className="submit-container">
          <div className="submit">Send</div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
