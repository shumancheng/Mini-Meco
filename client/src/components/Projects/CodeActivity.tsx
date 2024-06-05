import React from "react";
import { useNavigate } from "react-router-dom";

const CodeActivity: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/code-activity");
  };

  return (
    <div onClick={handleNavigation}>
      <h3>Code Activity</h3>
    </div>
  );
};

export default CodeActivity;
