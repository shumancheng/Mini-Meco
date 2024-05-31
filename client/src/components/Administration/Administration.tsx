import React from "react";
import UserAdmin from "./UserAdmin";
import ProjectAdmin from "./ProjectAdmin";

const Administration = () => {
  return (
    <div>
      <h2>Administration</h2>
      <UserAdmin />
      <ProjectAdmin />
    </div>
  );
};

export default Administration;
