import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import ReturnButton from "../Components/return";
import "./ProjectConfig.css";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const ProjectConfig: React.FC = () => {
  const navigate = useNavigate();


  const handleNavigation = () => {
    navigate("/project-config");
  };

  const [projects, setProjects] = useState<string[]>([]);
  // @ts-ignore: suppress unused variable warning
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }

    const fetchProjects = async () => {
      const userEmail = localStorage.getItem("email");
      if (userEmail) {
        try {
          const response = await fetch(
            `http://localhost:3000/userProjects?userEmail=${userEmail}`
          );
          const data = await response.json();
          setProjects(data.map((project: { projectName: string }) => project.projectName));
        } catch (error) {
          console.error("Error fetching projects:", error);
        }
      }
    };

    fetchProjects();
  }, [navigate]);

  const handleProjectChange = (projectName: string) => {
    setSelectedProject(projectName);
  };


  return (
    <div onClick={handleNavigation}>
      <ReturnButton />
      <div className="DashboardContainer">
        <h1>Project Config</h1>
      </div>
      <div className="BigContainerProjConfig">
        <div className="margintop">
      <Select onValueChange={handleProjectChange}>
            <SelectTrigger className="SelectTriggerProject">
              <SelectValue placeholder="Select Project" />
            </SelectTrigger>
            <SelectContent className="SelectContentProject">
              {projects.map((project) => (
                <SelectItem key={project} value={project}>
                  {project}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          </div>
          <div className="gitURL">Git URL</div>
      </div>
    </div>
  );
};

export default ProjectConfig;
