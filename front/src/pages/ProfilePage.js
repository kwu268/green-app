import React, { useState } from "react";
import "./Global.css";
import Navbar from "../components/Navbar.js";
import GameDataGrid from "../components/GameDataGrid.js";
import GameDataRow from "../components/GameDataRow.js";
import Profile from "../components/Profile.js";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import {
  sampleData,
} from "../sampleData.js";
import AppsIcon from "@mui/icons-material/Apps";
import MenuIcon from "@mui/icons-material/Menu";

function ProfilePage() {
  const [viewType, setViewType] = useState("grid");


  return (
    <div className="flex ">
      <div className="w-nav">
        <Navbar/>
      </div>

      <div className=" flex flex-col items-center w-full justify-around">
        <div className="">
          <Profile/>
        </div>
        <div className="m-3">
          <ButtonGroup
                variant="contained"
                aria-label="outlined primary button group"
              >
                <Button 
                  className="bg-green-200" 
                  onClick={() => {setViewType("grid")}}>
                  <AppsIcon />
                </Button>
                <Button 
                  className="bg-green-200" 
                  onClick={() => {setViewType("row")}}>
                  <MenuIcon />
                </Button>
                <Button 
                className="bg-green-200" 
                onClick={() => {setViewType("stats")}}>
                  Stats
                </Button>
            </ButtonGroup>
        </div>

        {viewType === "grid" && (
            <div className="grid grid-cols-12 justify-around content-around gap-2">
              {sampleData.map((course) => {
                return (
                  <div className="col-span-6 md:col-span-3"> 
                    <GameDataGrid courseData={course} /> 
                  </div>
                  
                  )
              })}
            </div>
          )}

        {viewType === "row" && (
                    <div className="border-green-700 border-2 w-3/4  flex-col">
                      {sampleData.map((course) => {
                        return (
                          <div className="m-1p"> 
                            <GameDataRow courseData={course} /> 
                          </div>
                          )
                      })}
                    </div>
                  )}
        
        
      </div>
    </div>
  );
}

export default ProfilePage;
