import React from "react";
import { useNavigate } from "react-router-dom";
import ReturnButton from "../Components/return";

const Happiness: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/happiness");
  };

  return (
    <div onClick={handleNavigation}>
      <ReturnButton />
      <h3>Happiness</h3>
    </div>
  );
};

export default Happiness;
