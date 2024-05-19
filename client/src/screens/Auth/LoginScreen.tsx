import { useState } from "react";
import "./LoginScreen.css";
import UserNameIcon from "./../../assets/UserNameIcon.png";
import EmailIcon from "./../../assets/EmailIcon.png";
import PasswordIcon from "./../../assets/PasswordIcon.png";
import axios from "axios";

const LoginScreen = () => {
  const [action, setAction] = useState("Registration");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:3000/register", { email, password });
      alert("Registration successful");
      setAction("Login");
    } catch (error) {
      alert("Registration failed");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("token", token);
      alert("Login successful");
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action === "Login" ? (
          <div>
            <br></br>
            <br></br>
          </div>
        ) : (
          <div className="input">
            <img className="username-icon" src={UserNameIcon} alt="" />
            <input
              className="inputBox"
              type="text"
              placeholder="Please enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}

        <div className="input">
          <img className="email-icon" src={EmailIcon} alt="" />
          <input
            className="inputBox"
            type="email"
            placeholder="Please enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input">
          <img className="password-icon" src={PasswordIcon} alt="" />
          <input
            className="inputBox"
            type="password"
            placeholder="Please enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      {action === "Registration" ? (
        <div></div>
      ) : (
        <div className="forget-password">
          Forget Password? <span>Click here</span>
        </div>
      )}

      <div className="submit-container">
        <div
          className={action === "Registration" ? "submit gray" : "submit"}
          onClick={action === "Registration" ? handleRegister : handleLogin}
        >
          {action}
        </div>
        <div
          className={action === "Login" ? "submit gray" : "submit"}
          onClick={() => {
            setAction(action === "Login" ? "Registration" : "Login");
          }}
        >
          {action === "Login" ? "Sign Up" : "Login"}
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
