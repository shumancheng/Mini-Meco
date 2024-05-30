import "./LoginScreen.css";
import EmailIcon from "./../../assets/EmailIcon.png";

const ForgotPassword = () => {
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
            <img className="email-icon" src={EmailIcon} alt="" />
            <input
              className="inputBox"
              type="email"
              placeholder="Please enter your email address"
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

export default ForgotPassword;
