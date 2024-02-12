import React, { useState } from "react";
import "./Global.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import SignInPage from "./pages/SignInPage.js";
import ProfilePage from "./pages/ProfilePage.js";
import AccountCreatedPage from "./pages/AccountCreatedPage.js";
import HomePage from "./pages/HomePage.js";
import Navbar from "./components/Navbar.js";
function App() {
  const [viewType, setViewType] = useState("grid");
  const [isSignedIn, setIsSignedIn] = useState(true);
  


  return (
    <div className="bg-gradient-to-b from-green-300 to-green-200 w-screen min-h-screen h-auto flex flex-col">
      {isSignedIn && <Navbar/>}

        <Routes>
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/account-created" element={<AccountCreatedPage />} />
          <Route path="/home" element={<HomePage/>} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>

    </div>
    
    // <div>
    //   <SignInPage/>
    
    // </div>
  );
}

export default App;
