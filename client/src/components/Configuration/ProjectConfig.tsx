import React, { useEffect, useState } from "react";
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
import Button from "react-bootstrap/esm/Button";

const ProjectConfig: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/project-config");
  };

  const [url, setURL] = useState("");
  const [projects, setProjects] = useState<string[]>([]);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [message, setMessage] = useState("");

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
          setProjects(
            data.map((project: { projectName: string }) => project.projectName)
          );
        } catch (error) {
          console.error("Error fetching projects:", error);
        }
      }
    };

    fetchProjects();
  }, [navigate]);

  const handleProjectChange = (projectName: string) => {
    console.log("Selected project:", projectName);
    setSelectedProject(projectName);
    fetchProjectURL(projectName);
  };

  const fetchProjectURL = async (projectName: string) => {
    if (!projectName) {
      console.error("Selected project is missing");
      return;
    } else if (!localStorage.getItem("email")) {
      console.error("User email is missing");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/getGitURL?email=${localStorage.getItem(
          "email"
        )}&project=${projectName}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error fetching URL:", errorData);
        return;
      }

      const data = await response.json();
      console.log("Fetched URL data:", data);

      if (data && data.url && data.url.url) {
        setURL(data.url.url);
        console.log(data.url.url);
      } else {
        setURL("");
      }
    } catch (error) {
      console.error("Error fetching URL:", error);
    }
  };

  const handleAddURL = async () => {
    const userEmail = localStorage.getItem("email");
    if (userEmail && selectedProject) {
      try {
        const response = await fetch(
          "http://localhost:3000/projConfig/addURL",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: userEmail,
              URL: url,
              project: selectedProject,
            }),
          }
        );
        const data = await response.json();
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error adding URL:", errorData);
        } else {
          setMessage(data.message || "URL added successfully");
          if (data.message.includes("successfully")) {
            window.location.reload();
          }
        }
      } catch (error) {
        console.error("Error adding URL:", error);
      }
    } else {
      console.error("User email or selected project is missing");
    }
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
        {selectedProject && (
          <>
            <div className="gitURL">Git URL</div>
            <input
              className="gitURLInput"
              type="url"
              placeholder="Please Add Git URL"
              value={url ?? ""}
              onChange={(e) => setURL(e.target.value)}
            />
            <Button className="confirm" type="submit" onClick={handleAddURL}>
              Confirm
            </Button>
          </>
        )}
        {message && <div className="message">{message}</div>}
      </div>
    </div>
  );
};

export default ProjectConfig;
