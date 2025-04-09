import React from "react";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
import './css/card.css';
import './index.css';

// We import all the components we need in our app
import Navbar from "./components/navbar";
import LandingPage from "./components/pages/landingPage";
import HomePage from "./components/pages/homePage";
import Login from "./components/pages/loginPage";
import Signup from "./components/pages/registerPage";
import PrivateUserProfile from "./components/pages/privateUserProfilePage";
import Stops from "./components/pages/mbtaSchedule";
import { createContext, useState, useEffect } from "react";
import getUserInfo from "./utilities/decodeJwt";

export const UserContext = createContext();
//test change
//test again
const App = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(getUserInfo());
  }, []);

  return ( 
    <> 
      <Navbar style={{ align: "left" }} /> 
      <UserContext.Provider value={user}> 
        <Routes> 
          <Route exact path="/" element={<Login />} />
          <Route exact path="/home" element={<HomePage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/mbtaSchedule" element={<Stops />} />
          <Route path="/privateUserProfile" element={<PrivateUserProfile />} />
          <Route path="/DatabaseConnectionTest" element={<LandingPage />} />

        </Routes>
      </UserContext.Provider>
    </>  
  );
};



export default App
