import "./LoginScreen.css";
import PasswordIcon from "./../../assets/PasswordIcon.png";

const ResetPassword = () => {
  return (
    <>
      <div className="container">
        <div className="header">
          <div className="text">Reset Your Password</div>
          <br></br>
          <div className="underline"></div>
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
        <div className="inputs">
          <div className="input">
            <img className="password-icon" src={PasswordIcon} alt="" />
            <input
              className="inputBox"
              type="password"
              placeholder="Confirm New Password"
            />
          </div>
        </div>

        <div className="submit-container">
          <div className="submit-ResetPassword"> - Reset Password -</div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
