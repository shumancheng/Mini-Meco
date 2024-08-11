import React, { useState, useEffect} from "react";
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

  const [status, setStatus] = useState<string | null>(null);
  const [users, setUsers] = useState<{ name: string; email: string }[]>([]);

  const handleNavigation = () => {
    navigate("/user-admin");
  };


    const fetchUserStatus = async (status: string) => {
      try {
        const response = await fetch(`http://localhost:3000/getUserStatus?status=${status}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
  
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    useEffect(() => {
      if (status) {
        fetchUserStatus(status);
      }
    }, [status]);


  return (
    <div onClick={handleNavigation}>
      <ReturnButton />
      <div className="DashboardContainer">
        <h1>User Admin</h1>
      </div>
      <div className="BigContainerProjConfig">
      <div className="SelectWrapperUserAdmin">
            <Select onValueChange={(value) => setStatus(value)}>
              <SelectTrigger className="SelectTrigger">
                <SelectValue
                  className="SelectValue"
                  placeholder="Select Status"
                />
              </SelectTrigger>
              <SelectContent className="SelectContent">
                
                  <SelectItem value={"unconfirmed"}>
                    <div className="SelectItem">unconfirmed</div>
                  </SelectItem>
                  <SelectItem value={"confirmed"}>
                    <div className="SelectItem">confirmed</div>
                  </SelectItem>
                
              </SelectContent>
            </Select>
          </div>
          {users.map((user, index) => (
          <React.Fragment key={user.email}>
            <div className="ProjectItem">
              <div className="ProjectName">{user.name}  ({user.email})</div>
              <img className="Edit" src={Edit} alt="Edit" />
            </div>
            {index < users.length - 1 && <hr className="ProjectDivider" />}
          </React.Fragment>
        ))}
        </div>
      </div>
  );
};

export default UserAdmin;
