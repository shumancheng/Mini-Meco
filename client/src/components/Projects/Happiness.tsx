import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReturnButton from "../Components/return";
import "./Happiness.css";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DatePicker, { Calendar, DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import Button from "react-bootstrap/esm/Button";

const Happiness: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("User");
  const [projectGroups, setProjectGroups] = useState<string[]>([]);
  const [selectedProjectGroup, setSelectedProjectGroup] = useState<string>("");
  const [values, setValues] = useState([
    new DateObject(),
    new DateObject().add(1, "day"),
  ]);

  const handleNavigation = () => {
    navigate("/happiness");
  };

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
          <div className="BigContainerAdmin">
            <div className="SelectWrapperHappiness">
              <Select
                onValueChange={(value) => {
                  console.log("Selected Project Group:", value);
                  setSelectedProjectGroup(value);
                }}
              >
                <SelectTrigger className="SelectTrigger">
                  <SelectValue
                    className="SelectValue"
                    placeholder="Select Project Group"
                  />
                </SelectTrigger>
                <SelectContent className="SelectContent">
                  {projectGroups.map((group) => (
                    <SelectItem key={group} value={group}>
                      {group}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            Sprints
            <div className="Calendar">
              <Calendar
                className="custom-calendar"
                value={values}
                onChange={setValues}
                multiple
                plugins={[<TimePicker />]}
              />
            </div>
            <Button className="save" type="submit">
              Save
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="User">
          <div className="BigContainerUser">
            <div className="UserSentence1">Please Enter Before (Date)</div>
            <div className="UserSentence2">
              How happy you are doing this project?
            </div>
          </div>
        </TabsContent>
        <TabsContent value="Display">
          <div className="BigContainerDisplay">Display</div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Happiness;
