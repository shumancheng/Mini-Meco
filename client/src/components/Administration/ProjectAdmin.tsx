import React from "react";
import { useNavigate } from "react-router-dom";

const ProjectAdmin: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/project-admin");
  };

  return (
    <div onClick={handleNavigation}>
      <h3>Project Administration</h3>
    </div>
  );
};

export default ProjectAdmin;
