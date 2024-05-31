import React from "react";
import Projects from "./Projects/Projects";
import Configuration from "./Configuration/Configuration";
import Administration from "./Administration/Administration";

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <Projects />
        <Configuration />
        <Administration />
      </div>
    </div>
  );
};

export default Dashboard;
