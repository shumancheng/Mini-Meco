import React from "react";
import { useNavigate } from "react-router-dom";
import ReturnButton from "../Components/return";
import "./Standups.css";
import Button from "react-bootstrap/esm/Button";

const Standups: React.FC = () => {
  const navigate = useNavigate();
  const handleStandups = () => {
    navigate("/standups");
  };

  return (
    <div onClick={handleStandups}>
      <ReturnButton />
      <div className="DashboardContainerStandups">
        <h1>Standup Emails</h1>
      </div>
      <div className="BigContainerStandups">
        <div className="InputContainer">
          <div className="Done">
            <div className="DoneTitle">Done</div>
            <input className="DoneContainer" type="text" />
          </div>
          <div className="Plans">
            <div className="PlansTitle">Plans</div>
            <input className="PlansContainer" type="text" />
          </div>
          <div className="Challenges">
            <div className="ChallengesTitle">Challenges</div>
            <input className="ChallengesContainer" type="text" />
          </div>
        </div>
        <Button className="SendButton" type="submit">
          Send Email
        </Button>
      </div>
    </div>
  );
};

export default Standups;
