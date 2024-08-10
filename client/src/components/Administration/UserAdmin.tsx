import React from "react";
import { useNavigate } from "react-router-dom";
import ReturnButton from "../Components/return";
import "./UserAdmin.css";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import Edit from "./../../assets/Edit.png";

const UserAdmin: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/user-admin");
  };

  return (
    <div onClick={handleNavigation}>
      <ReturnButton />
      <div className="DashboardContainer">
        <h1>User Admin</h1>
      </div>
      <div className="BigContainerProjConfig">
      <div className="SelectWrapperUserAdmin">
            <Select>
              <SelectTrigger className="SelectTrigger">
                <SelectValue
                  className="SelectValue"
                  placeholder="Select Status"
                />
              </SelectTrigger>
              <SelectContent className="SelectContent">
                
                  <SelectItem value={"1"}>
                    <div className="SelectItem">unconfirmed</div>
                  </SelectItem>
                  <SelectItem value={"2"}>
                    <div className="SelectItem">confirmed</div>
                  </SelectItem>
                
              </SelectContent>
            </Select>
          </div>

              <div className="ProjectItem">
                <div className="ProjectName">shuman (shumancheng0119@gmail.com)</div>
                <img className="Edit" src={Edit} alt="Edit" />
              </div>
              <hr className="ProjectDivider" />
              <div className="ProjectItem">
                <div className="ProjectName">Test (Test@fau.de)</div>
                <img className="Edit" src={Edit} alt="Edit" />
              </div>
              <hr className="ProjectDivider" />
        </div>
      </div>
  );
};

export default UserAdmin;
