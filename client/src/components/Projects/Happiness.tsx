import React from "react";
import { useNavigate } from "react-router-dom";

const Happiness: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/happiness");
  };

  return (
    <div onClick={handleNavigation}>
      <h3>Happiness</h3>
    </div>
  );
};

export default Happiness;
