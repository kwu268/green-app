import React, { useState } from "react";
import "./Global.css";
import Navbar from "./components/Navbar.js";
import GameDataCard from "./components/GameDataCard.js";
import GameDataRow from "./components/GameDataRow.js";
import Profile from "./components/Profile.js";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { sampleCourseDataAll } from "./sampleData.js";
import AppsIcon from "@mui/icons-material/Apps";
import MenuIcon from "@mui/icons-material/Menu";

function App() {
  const [viewType, setViewType] = useState("grid");

  return (
    <div className="relative flex flex-row h-auto">
      <Navbar />

      <div
        name="Avatar Profile and Game Cards"
        className="flex flex-col w-full h-3/4 "
      >
        <div name="prfile info " className="h-full">
          <Profile />
        </div>

        <div
          name="game data"
          className="align-middle h-auto border-t-2 w-3/4 self-center"
        >
          <div className="pt-3 flex justify-center">
            <ButtonGroup
              variant="contained"
              aria-label="outlined primary button group"
            >
              <Button
                className="bg-primary text-black"
                onClick={() => setViewType("grid")}
              >
                <AppsIcon />
              </Button>
              <Button
                className="bg-primary text-black"
                onClick={() => setViewType("row")}
              >
                <MenuIcon />
              </Button>
              <Button
                className="bg-primary text-black"
                onClick={() => setViewType("stats")}
              >
                Stats
              </Button>
            </ButtonGroup>
          </div>
          <div className="mt-5">
            {viewType === "grid" && (
              <div className="flex flex-start flex-wrap gap-7">
                {sampleCourseDataAll.map((courseData) => {
                  return <GameDataCard courseData={courseData} />;
                })}
              </div>
            )}
            {viewType === "row" && (
              <div className="flex flex-start flex-wrap gap-7">
                {sampleCourseDataAll.map((courseData) => {
                  return <GameDataRow courseData={courseData} />;
                })}
              </div>
            )}
            {viewType === "stats" && (
              <div className="flex flex-start flex-wrap gap-7">
                {sampleCourseDataAll.map((courseData) => {
                  return <GameDataRow courseData={courseData} />;
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
