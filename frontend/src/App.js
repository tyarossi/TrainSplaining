import React from "react";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
import './css/card.css';
import './index.css';

// We import all the components we need in our app
import Navbar from "./components/navbar";
import LandingPage from "./components/pages/landingPage";
import Login from "./components/pages/loginPage";
import Signup from "./components/pages/registerPage";
import PrivateUserProfile from "./components/pages/privateUserProfilePage";
import Wallet from "./components/pages/walletPage"
import Stops from "./components/pages/mbtaSchedule";
import { createContext, useState, useEffect } from "react";
import getUserInfo from "./utilities/decodeJwt";
import MbtaAlerts from "./components/pages/mbtaAlerts";

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
          <Route exact path="/mbtaSchedule" element={<Stops />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/mbtaSchedule" element={<Stops />} />
          <Route exact path="/wallet" element={<Wallet />} />
          <Route path="/privateUserProfile" element={<PrivateUserProfile />} />
          <Route path="/DatabaseConnectionTest" element={<LandingPage />} />
          <Route path="/mbtaAlerts" element={<MbtaAlerts />} />
        </Routes>
      </UserContext.Provider>
    </>  
  );
};



export default App