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
  const [isSignedIn, setIsSignedIn] = useState(false);
  


  return (
    <div className="">
      {isSignedIn && <Navbar/>}
      <BrowserRouter>
        <Routes>
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/account-created" element={<AccountCreatedPage />} />
          <Route path="/home" element={<HomePage/>} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </div>
    
    // <div>
    //   <SignInPage/>
    
    // </div>
  );
}

export default App;
