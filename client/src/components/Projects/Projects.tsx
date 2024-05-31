import React from "react";
import Standups from "./Standups";
import Happiness from "./Happiness";
import CodeActivity from "./CodeActivity";

const Projects: React.FC = () => {
  return (
    <div>
      <h2>Projects</h2>
      <Standups />
      <Happiness />
      <CodeActivity />
    </div>
  );
};

export default Projects;
