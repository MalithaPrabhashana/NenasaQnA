import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nenasa from "./components/Nenasa";
import LoginPage from "./login/LoginPage";
import EditProfile from "./editProfile/EditProfilePage";
import './App.css';
import PhysicsVideos from "../src/coursesToFollow/PhysicsVideos.js"
import ChemistryVideos from "../src/coursesToFollow/ChemistryVideos.js"

function App() {
  // const storedToken = localStorage.getItem("token");


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<Nenasa />} />
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/physicsVideos" element={<PhysicsVideos />} />
          <Route path="/chemistryVideos" element={<ChemistryVideos />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
