import React, { useEffect } from "react";
import Projects from "./Projects/Projects";
import Configuration from "./Configuration/Configuration";
import Administration from "./Administration/Administration";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";


const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const username = localStorage.getItem("username");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  }

  return (
    <div>
      <div className="DashboardContainer">
        <h1>Dashboard</h1>
      </div>
      <div className="UserLogoutContainer">
        <div className="UserAttribute">
          <h3>User: {username}</h3>
        </div>
        <div className="Logout" onClick={logout}>
          <h3>Log out</h3>
        </div>
      </div>

      <div>
        <div className="Title">
          <h2>Projects</h2>
        </div>
        <div className="Container">
          <Projects />
        </div>
        <div className="Title ConfigTitle">
          <h2>Configuration</h2>
        </div>
        <div className="Container">
          <Configuration />
        </div>

        <div className="Title AdminTitle">
          <h2>Administration</h2>
        </div>
        <div className="Container">
          <Administration />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
