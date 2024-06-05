import React from "react";
import { useNavigate } from "react-router-dom";

const Standups: React.FC = () => {
  const navigate = useNavigate();
  const handliestandups = () => {
    navigate("/standups");
  };

  return (
    <div onClick={handliestandups}>
      <h3>Standups</h3>
    </div>
  );
};

export default Standups;
