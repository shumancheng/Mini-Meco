import React from "react";
import Projects from "./Projects/Projects";
import Configuration from "./Configuration/Configuration";
import Administration from "./Administration/Administration";
import "./Dashboard.css";

const Dashboard: React.FC = () => {
  return (
    <div>
      <div className="DashboardContainer">
        <h1>Dashboard</h1>
      </div>
      <div>
        <div className="Title">
          {" "}
          <h2>Projects</h2>
        </div>
        <div className="Container">
          <Projects />
        </div>
        <div className="Title ConfigTitle"> <h2>Configuration</h2></div>
          <div className="Container">
            <Configuration />
          </div>
        
        <div className="Title AdminTitle"> <h2>Administration</h2></div>
          <div className="Container">
            <Administration />
          </div>
      </div>
    </div>
  );
};

export default Dashboard;
