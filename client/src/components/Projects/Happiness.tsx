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
import ReactSlider from "react-slider";
import moment from "moment";

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

  const handleDate = async () => {
    const formattedDates = values.map((date) =>
      moment(date.toDate()).format("DD/MM/YYYY HH:mm:ss")
    );

    console.log("Selected Dates:", formattedDates);
    console.log("current date:", getDate());

    const currentDate = new Date();
    const nextDate = values.find((date) => date.toDate() > currentDate);

    if (nextDate) {
      console.log("Next Date:", moment(nextDate.toDate()).format("DD/MM/YYYY HH:mm:ss"));
    } else {
      console.log("No future dates selected");
    }

    try {
      await fetch("http://localhost:3000/createSprint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectGroupName: selectedProjectGroup,
          startDate: formattedDates[0],
          endDate: formattedDates[1],
        }),
      });
      alert("Sprint created successfully");
    } catch (error) {
      console.error("Error creating sprint:", error);
    }
  };
  const currentDate = new Date();
  const nextDate = values.find((date) => date.toDate() > currentDate);

  const formattedDates = nextDate ? moment(nextDate.toDate()).format(
    "DD-MM-YYYY HH:mm:ss"
  ) : "";


  const getDate = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    const time = new Date();
    const showTime =
      time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
    return `${date}/${month}/${year} ${showTime}`;
  };

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
            <Button className="save" type="submit" onClick={handleDate}>
              Save
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="User">
          <div className="BigContainerUser">
            <div className="UserSentence1">
              Please Enter Before {formattedDates}
            </div>
            <div className="UserSentence2">
              How happy are you doing this project?
            </div>
            <div className="slider-container">
              <ReactSlider
                className="horizontal-slider"
                marks
                markClassName="example-mark"
                min={-3}
                max={3}
                thumbClassName="example-thumb"
                trackClassName="example-track"
                renderThumb={(props, state) => (
                  <div {...props}>{state.valueNow}</div>
                )}
              />{" "}
              <div className="scale">
                <span>-3</span>
                <span>-2</span>
                <span>-1</span>
                <span>0</span>
                <span>1</span>
                <span>2</span>
                <span>3</span>
              </div>{" "}
            </div>
            <Button className="confirm" type="submit">
              Confirm
            </Button>
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
