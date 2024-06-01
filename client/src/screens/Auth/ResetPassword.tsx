import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./LoginScreen.css";

const ResetPassword = () => {
  const { token } = useParams<{ token: string }>();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const endpoint = "/resetPassword";
    const body = { token, newPassword };

    try {
      const response = await fetch(`http://localhost:3000${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setMessage(data.message || "Password has been reset!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error occurred");
      }
    }
  };

  return (
    <>
      <div className="container">
        <div className="header">
          <div className="text">Reset Your Password</div>
          <br />
          <div className="underline"></div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="inputs">
            <div className="input">
              <input
                className="inputBox"
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="submit-container">
            <button type="submit" className="submit">
              Reset Password
            </button>
          </div>
        </form>
        {message && <div className="message">{message}</div>}
      </div>
    </>
  );
};

export default ResetPassword;
