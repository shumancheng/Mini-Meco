import "./Settings.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import Add from "./../../assets/Add.png";
import Edit from "./../../assets/Edit.png";
import Delete from "./../../assets/Line 20.png";
import ReturnButton from "../Components/return";

const Settings: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/settings");
  };

  const [projectGroups, setProjectGroups] = useState<string[]>([]);
  const [projects, setProjects] = useState<
    { id: number; projectName: string; projectGroupName: string }[]
  >([]);
  const [selectedProjectGroup, setSelectedProjectGroup] = useState<string>("");

  useEffect(() => {
    const fetchProjectGroups = async () => {
      try {
        const response = await fetch("http://localhost:3000/project-groups");
        const data = await response.json();
        setProjectGroups(data.map((item: any) => item.projectGroupName));
        console.log("Fetched project groups:", data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    };

    fetchProjectGroups();
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      if (selectedProjectGroup) {
        try {
          const response = await fetch(
            `http://localhost:3000/projects?projectGroupName=${selectedProjectGroup}`
          );
          const data = await response.json();
          const mappedProjects = data.map((item: any) => ({
            id: item.id,
            projectName: item.projectName,
            projectGroupName: item.projectGroupName || selectedProjectGroup, // Fallback to selectedProjectGroup if undefined
          }));
          setProjects(mappedProjects);
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.error(error.message);
          }
        }
      } else {
        setProjects([]);
      }
    };

    fetchProjects();
  }, [selectedProjectGroup]);

  const filteredProjects = projects.filter(
    (project) => project.projectGroupName === selectedProjectGroup
  );

  return (
    <div onClick={handleNavigation}>
      <ReturnButton />
      <div className="DashboardContainer">
        <h1>Settings</h1>
      </div>
      <div className="BigContainer">
        <div className="AccountInfoContainer">
          <div className="AccountTitle">
            <h3>Account Info</h3>
            <div className="PersonalDataCOntainer">
              <div className="PersonalData">
                <div className="Email">Email: abc@fau.de</div>
                <img className="Edit2" src={Edit} />
              </div>
              <div className="PersonalData">
                <div className="Password">Password: **********</div>
                <img className="Edit2" src={Edit} />
              </div>
            </div>
          </div>
        </div>
        <div className="ProjectContainer">
          <div className="ProjectTitle">
            <h3>Project Lists</h3>
          </div>
          <div className="SelectWrapper">
            <Select
              onValueChange={(value) => {
                console.log("Selected Project Group:", value);
                setSelectedProjectGroup(value);
              }}
            >
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
          {filteredProjects.map((project) => (
            <>
              <div key={project.id} className="ProjectItem2">
                <div className="ProjectName">{project.projectName}</div>
                <div className="Imgs">
                  <img className="Add" src={Add} />
                  <img className="Delete" src={Delete} />
                </div>
              </div>
              <hr className="ProjectDivider" />
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;
