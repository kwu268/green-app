import React, { useState } from "react";
import "./Global.css";
import Navbar from "./components/Navbar.js";
import GameDataGrid from "./components/GameDataGrid.js";
import GameDataRow from "./components/GameDataRow.js";
import Profile from "./components/Profile.js";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import {
  sampleData,
} from "./sampleData.js";
import AppsIcon from "@mui/icons-material/Apps";
import MenuIcon from "@mui/icons-material/Menu";

import SignInPage from "./pages/SignInPage.js";

function App() {
  const [viewType, setViewType] = useState("grid");


  return (
    <div>
      <SignInPage/>
    </div>
  );
}

export default App;
