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
import ReturnButton from "../Components/return";

const ProjectAdmin: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/project-admin");
  };

  const semesters = ["SS23", "WS2324", "SS24", "WS2425"];
  const projectGroups = ["AMOS", "ADAP"];
  const projects = ["Project A", "Project B", "Project C"];

  return (
    <div onClick={handleNavigation}>
      <ReturnButton />
      <div className="DashboardContainer">
        <h1>Project Admin</h1>
      </div>
      <div className="BigContainer">
        <div className="ProjectGroupContainer">
          <div className="title">
            <h3>Project Group Lists</h3>
            <div className="Add">
              <img src={Add} alt="Add" />
            </div>
          </div>
          <div className="SelectWrapper">
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
          </div>
          <div className="ProjectItem">
            <div className="ProjectName">{projectGroups[0]}</div>
            <img className="Edit" src={Edit} alt="Edit" />
          </div>
          <hr className="ProjectDivider" />
          <div className="ProjectItem">
            <div className="ProjectName">{projectGroups[1]}</div>
            <img className="Edit" src={Edit} alt="Edit" />
          </div>
          <hr className="ProjectDivider" />
        </div>
        <div className="ProjectContainer">
          <div className="ProjectTitle">
            <h3>Project Lists</h3>
            <div className="Add">
              <img src={Add} alt="Add" />
            </div>
          </div>
          <div className="SelectWrapper">
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
          </div>
          <div className="ProjectItem">
            <div className="ProjectName">{projects[0]}</div>
            <img className="Edit" src={Edit} alt="Edit" />
          </div>
          <hr className="ProjectDivider" />
          <div className="ProjectItem">
            <div className="ProjectName">{projects[1]}</div>
            <img className="Edit" src={Edit} alt="Edit" />
          </div>
          <hr className="ProjectDivider" />
          <div className="ProjectItem">
            <div className="ProjectName">{projects[2]}</div>
            <img className="Edit" src={Edit} alt="Edit" />
          </div>
          <hr className="ProjectDivider" />
        </div>
      </div>
    </div>
  );
};

export default ProjectAdmin;
