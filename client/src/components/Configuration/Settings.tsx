import React from "react";
import { useNavigate } from "react-router-dom";

const Settings: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/settings");
  };

  return (
    <div onClick={handleNavigation}>
      <h3>Settings</h3>
    </div>
  );
};

export default Settings;
