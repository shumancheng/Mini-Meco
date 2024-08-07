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

  const [projectName, setProjectName] = useState<string | null>("");
  // @ts-ignore: suppress unused variable warning
  const [userName, setUserName] = useState<string | null>(null);
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );
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
    const storedUserName = localStorage.getItem("username");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, [location.state]);


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
    const fetchUserData = () => {
      const userName = localStorage.getItem("username");
      const userEmail = localStorage.getItem("email");
      if (userName && userEmail) {
        setUser({ name: userName, email: userEmail });
      } else {
        console.warn("User data not found in localStorage");
      }
    };

    fetchUserData();
  }, []);

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
      } catch (error) {
        console.error("Error fetching sprints:", error);
      }
    };

    fetchAllSprints();
  }, [selectedProjectGroup]);

  console.log("Project Name:", projectName);
  console.log("User:", user);
  console.log("Project Groups:", projectGroups);

  const getCommits = async (page: number) => {
    try {
      const response = await octokit.request(
        "GET /repos/{owner}/{repo}/commits",
        {
          owner: "amosproj",
          repo: "amos2024ss04-building-information-enhancer",
          per_page: 100,
          page: page,
        }
      );
      setCommits((prevCommits) => [...prevCommits, ...response.data]); 
      if (response.data.length < 100) {
        setHasMore(false);
      }
    } catch (error: any) {
      console.error(
        `Error! Status: ${error.status}. Message: ${error.response.data.message}`
      );
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
              <p><strong>Username:</strong> {commit.author.login}</p>
              <p><strong>Date:</strong> {commit.commit.author.date}</p>
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