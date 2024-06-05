import React from "react";
import { useNavigate } from "react-router-dom";

const ProjectConfig: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/project-config");
  };

  return (
    <div onClick={handleNavigation}>
      <h3>Project Configuration</h3>
    </div>
  );
};

export default ProjectConfig;
