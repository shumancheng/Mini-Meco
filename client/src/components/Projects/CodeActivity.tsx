import React from "react";
import { useNavigate } from "react-router-dom";
import ReturnButton from "../Components/return";
import {Octokit} from "octokit";

const CodeActivity: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/code-activity");
  };

  const octokit = new Octokit({ 
    auth: process.env.Token
  });

  const getIssue = async () =>{
    try {
      const response = await octokit.request("GET /repos/{owner}/{repo}/issues", {
        owner: "octocat",
        repo: "Spoon-Knife",
      });
      

      console.log(response);
    } catch (error: any) {
      console.error(`Error! Status: ${error.status}. Message: ${error.response.data.message}`);
    }
  }


  return (
    <div onClick={handleNavigation}>
      <ReturnButton />
      <h3>Code Activity</h3>
      <h3>Code Activity</h3>
      <h3>Code Activity</h3>
    </div>
  );
};

export default CodeActivity;
