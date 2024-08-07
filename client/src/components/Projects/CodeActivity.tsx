import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReturnButton from "../Components/return";
import { Octokit } from "@octokit/rest";

const CodeActivity: React.FC = () => {
  const navigate = useNavigate();
  const [commits, setCommits] = useState<any[]>([]);

  
  const handleNavigation = () => {
    navigate("/code-activity");
  };

  const octokit = new Octokit({
    auth: import.meta.env.VITE_GITHUB_TOKEN,
  });

  const getCommits = async () => {
    try {
      const response = await octokit.request(
        "GET /repos/{owner}/{repo}/commits",
        {
          owner: "amosproj",
          repo: "amos2024ss04-building-information-enhancer",
        }
      );
      setCommits(response.data);
    } catch (error: any) {
      console.error(
        `Error! Status: ${error.status}. Message: ${error.response.data.message}`
      );
    }
  };

  useEffect(() => {
    getCommits();
  }, []);

  return (
    <div onClick={handleNavigation}>
      <ReturnButton />
      <h3>Code Activity</h3>
      {commits.length > 0 ? (
        <ul>
          {commits.map((commit, index) => (
            <li key={index}>
              <p><strong>Username:</strong> {commit.author.login}</p>
              <p><strong>Date:</strong> {commit.commit.author.date}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CodeActivity;
