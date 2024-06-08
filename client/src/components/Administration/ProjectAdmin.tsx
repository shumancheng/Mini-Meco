import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProjectAdmin.css";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import Add from "./../../assets/Add.png";
import Edit from "./../../assets/Edit.png";

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

  const semesters = ["SS23", "WS2324", "SS24", "WS2425"];
  const projectGroups = ["AMOS", "ADAP"];

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
          <Select>
            <SelectTrigger className="SelectTrigger">
              <SelectValue
                className="SelectValue"
                placeholder="Select Semester"
              />
            </SelectTrigger>
            <SelectContent className="SelectContent">
              {semesters.map((semester) => (
                <SelectItem key={semester} value={semester}>
                  {semester}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="Add">
            <img src={Add} alt="Add" />
          </div>
          <div className="ProjectItem">
            <div className="ProjectName">AMOS #22</div>
            <img className="Edit" src={Edit} alt="Edit" />
          </div>
          <hr className="ProjectDivider" />
          <div className="ProjectItem">
            <div className="ProjectName">ADAP</div>
            <img className="Edit" src={Edit} alt="Edit" />
          </div>
          <hr className="ProjectDivider" />
        </div>
        <div className="ProjectContainer">
          <div className="ProjectTitle">
            <h3>Project Lists</h3>
          </div>
          <Select>
            <SelectTrigger className="SelectTrigger">
              <SelectValue
                className="SelectValue"
                placeholder="Select Project Group"
              />
            </SelectTrigger>
            <SelectContent className="SelectContent">
              {projectGroups.map((group) => (
                <SelectItem key={group} value={group}>
                  {group}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="Add">
            <img src={Add} alt="Add" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectAdmin;
