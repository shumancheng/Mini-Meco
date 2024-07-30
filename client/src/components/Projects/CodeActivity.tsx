import React from "react";
import { useNavigate } from "react-router-dom";
import ReturnButton from "../Components/return";
import octokit from "octokit";

const CodeActivity: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/code-activity");
  };

  return (
    <div onClick={handleNavigation}>
      <ReturnButton />
      <h3>Code Activity</h3>
    </div>
  );
};

export default CodeActivity;
