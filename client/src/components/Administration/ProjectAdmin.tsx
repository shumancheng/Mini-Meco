import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProjectAdmin.css";

const ProjectAdmin: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/project-admin");
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
        <h1>Project Admin</h1>
      </div>
      <div className="BigContainer">
        <div className="ProjectGroupContainer">
          <div className="title">
            <h3>Project Group Lists</h3>
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

export default ProjectAdmin;
