import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReturnButton from "../Components/return";
import { Octokit } from "@octokit/rest";

const CodeActivity: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [commits, setCommits] = useState<any[]>([]);
  // GitHub API only returns 30 results on subsequent requests
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const [repoDetails, setRepoDetails] = useState<{
    owner: string;
    repo: string;
  } | null>(null);
  const [sprints, setSprints] = useState<any[]>([]);

  const [projectName, setProjectName] = useState<string | null>("");
  const [user, setUser] = useState<{
    name: string;
    email: string;
    githubUsername: string;
  } | null>(null);
  // @ts-ignore: suppress unused variable warning
  const [projectGroups, setProjectGroups] = useState<string[]>([]);
  const [selectedProjectGroup, setSelectedProjectGroup] = useState<string>("");

  const handleNavigation = () => {
    navigate("/code-activity");
  };

  const octokit = new Octokit({
    auth: import.meta.env.VITE_GITHUB_TOKEN,
  });

  useEffect(() => {
    const projectNameFromState = location.state?.projectName;
    if (projectNameFromState) {
      setProjectName(projectNameFromState);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchProjectGroup = async () => {
      if (!projectName) return;
  
      try {
          const response = await fetch(
              `http://localhost:3000/getUserProjectGroups?projectName=${encodeURIComponent(projectName)}`
          );
          if (response.ok) {
              const text = await response.text();
              console.log("Response text:", text);
              if (text) {
                  const data = JSON.parse(text);
                  console.log("Data:", data);
                  if (data && data.projectGroupName) {
                      setSelectedProjectGroup(data.projectGroupName);
                  }
              } else {
                  console.error("Empty response body");
              }
          } else {
              console.error(`Error: ${response.status} ${response.statusText}`);
          }
      } catch (error) {
          console.error("Error fetching project group:", error);
      }
  };
  

    fetchProjectGroup();
  }, [projectName]);

  useEffect(() => {
    const fetchUserData = () => {
      const userName = localStorage.getItem("username");
      const userEmail = localStorage.getItem("email");
      const githubUsername = localStorage.getItem("githubUsername");
      if (userName && userEmail && githubUsername) {
        setUser({
          name: userName,
          email: userEmail,
          githubUsername: githubUsername,
        });
      } else {
        console.warn("User data not found in localStorage");
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchRepoUrl = async () => {
      if (!projectName || !user?.email) return;

      try {
        const response = await fetch(
          `http://localhost:3000/getProjectGitHubURL?email=${encodeURIComponent(
            user.email
          )}&projectName=${encodeURIComponent(projectName)}`
        );
        const data = await response.json();
        console.log("Fetched repository URL:", data);
        if (data && data.url) {
          const urlSegments = data.url.split("/");
          const owner = urlSegments[urlSegments.length - 2];
          const repo = urlSegments[urlSegments.length - 1];
          setRepoDetails({ owner, repo });
        }
        const owner = repoDetails?.owner;
        const repo = repoDetails?.repo;
        console.log("Owner:", owner);
        console.log("Repo:", repo);
      } catch (error) {
        console.error("Error fetching repository URL:", error);
      }
    };

    fetchRepoUrl();
  }, [projectName, user]);

  useEffect(() => {
    const fetchAllSprints = async () => {
      if (!selectedProjectGroup) return;

      try {
        const response = await fetch(
          `http://localhost:3000/sprints?projectGroupName=${encodeURIComponent(
            selectedProjectGroup
          )}`
        );
        const sprints = await response.json();
        setSprints(sprints);
        console.log("Fetched sprints:", sprints);
      } catch (error) {
        console.error("Error fetching sprints:", error);
      }
    };

    fetchAllSprints();
  }, [selectedProjectGroup]);

  console.log("Project Name:", projectName);
  console.log("User:", user);
  console.log("Project Groups:", projectGroups);

  // Updated getCommits function to filter commits by user and date range

  const getCommits = async (page: number) => {
    if (!repoDetails) return;

    try {
      const response = await octokit.request(
        "GET /repos/{owner}/{repo}/commits",
        {
          owner: repoDetails.owner,
          repo: repoDetails.repo,
          per_page: 100,
          page: page,
          author: user?.githubUsername,
        }
      );

      // Filter commits based on the sprint date range
      const filteredCommits = response.data.filter((commit) => {
        const commitDate = commit.commit.author?.date
          ? new Date(commit.commit.author.date)
          : new Date();
        return sprints.some((sprint) => {
          const sprintStart = new Date(sprint.startDate);
          const sprintEnd = new Date(sprint.endDate);
          return commitDate >= sprintStart && commitDate <= sprintEnd;
        });
      });

      setCommits((prevCommits) => [...prevCommits, ...filteredCommits]);
      if (response.data.length < 100) {
        setHasMore(false);
      }
    } catch (error) {
      console.error(`Error fetching commits: ${error}`);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasMore) {
      getCommits(page);
    }
  }, [page]);

  const loadMoreCommits = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div onClick={handleNavigation}>
      <ReturnButton />
      <h3>Code Activity</h3>
      {commits.length > 0 ? (
        <ul>
          {commits.map((commit, index) => (
            <li key={index}>
              <p>
                <strong>Username:</strong> {commit.author.login}
              </p>
              <p>
                <strong>Date:</strong> {commit.commit.author.date}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
      {loading && <p>Loading more commits...</p>}
      {hasMore && !loading && (
        <button onClick={loadMoreCommits}>Load More</button>
      )}
    </div>
  );
};

export default CodeActivity;
