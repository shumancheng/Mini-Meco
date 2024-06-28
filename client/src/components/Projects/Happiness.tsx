import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReturnButton from "../Components/return";
import "./Happiness.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Happiness: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("User");

  const handleNavigation = () => {
    navigate("/happiness");
  };

  const ChangeTabs = () => {};

  return (
    <div onClick={handleNavigation}>
      <ReturnButton />
      <div className="DashboardContainer">
        <h1>Happiness</h1>
      </div>
      <Tabs defaultValue="User" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2 TabsList">
          <TabsTrigger
            value="Admin"
            onClick={() => setActiveTab("Admin")}
            className={`Admin ${activeTab === "Admin" ? "active" : ""}`}
          >
            Admin
          </TabsTrigger>
          <TabsTrigger
            value="User"
            onClick={() => setActiveTab("User")}
            className={`User ${activeTab === "User" ? "active" : ""}`}
          >
            User
          </TabsTrigger>
          <TabsTrigger
            value="Display"
            onClick={() => setActiveTab("Display")}
            className={`Display ${activeTab === "Display" ? "active" : ""}`}
          >
            Display
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Admin">
          <div className="BigContainerAdmin">Admin</div>
        </TabsContent>
        <TabsContent value="User">
          <div className="BigContainerUser">User</div>
        </TabsContent>
        <TabsContent value="Display">
          <div className="BigContainerDisplay">Display</div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Happiness;
