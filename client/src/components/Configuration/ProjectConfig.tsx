import React from "react";
import { useNavigate } from "react-router-dom";
import ReturnButton from "../Components/return";

const ProjectConfig: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/project-config");
  };

  return (
    <div onClick={handleNavigation}>
      <ReturnButton />
      <h3>Project Configuration</h3>
    </div>
  );
};

export default ProjectConfig;
