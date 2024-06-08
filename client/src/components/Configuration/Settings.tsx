import React from "react";
import { useNavigate } from "react-router-dom";
import "./Settings.css";

const Settings: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/settings");
  };

  const returnToDashboard = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    navigate("/dashboard");
  };
  return (
    <div onClick={handleNavigation}>
      <div className="Return" onClick={returnToDashboard}>
        Return
      </div>
      <div className="DashboardContainer">
        <h1>Settings</h1>
      </div>
      <div className="BigContainer">
        <div className="ProjectGroupContainer">
          <div className="title">
            <h3>Account Info</h3>
          </div>
        </div>
        <div className="ProjectContainer">
          <div className="ProjectTitle">
            <h3>Project Lists</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
