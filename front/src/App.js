import React, { useEffect, useState } from "react";
import "./Global.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import SignInPage from "./pages/SignInPage.js";
import ProfilePage from "./pages/ProfilePage.js";
import AccountCreatedPage from "./pages/AccountCreatedPage.js";
import HomePage from "./pages/HomePage.js";
import Navbar from "./components/Navbar.js";
function App() {
  
  const [isSignedIn, setIsSignedIn] = useState(true);
  const [token, setToken] = useState(false);

  if (token) {
    sessionStorage.setItem('token', JSON.stringify(token))
  }

  useEffect( () => {
    if (sessionStorage.getItem('token')) {
      const tokenData = JSON.parse(sessionStorage.getItem('token'));
      setToken(tokenData)
    }
  }, [])



  return (
    <div className="bg-gradient-to-b from-green-200 to-green-200 w-screen min-h-screen h-auto flex flex-col">
      {token && <Navbar token={token}/>}

        <Routes>
          <Route path="/sign-in" element={<SignInPage setToken={setToken}/>} />
          <Route path="/account-created" element={<AccountCreatedPage />} />
          {token && <Route path="/profile" element={<ProfilePage token={token}/>} />}
          {token && <Route path="/home" element={<HomePage token={token}/>}/>}
          {token && <Route path="/" element={<HomePage token={token}/>} />}
        </Routes>

    </div>
    
    // <div>
    //   <SignInPage/>
    
    // </div>
  );
}

export default App;
