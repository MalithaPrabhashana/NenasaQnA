import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nenasa from "./components/Nenasa";
import LoginPage from "./login/LoginPage";
import EditProfile from "./editProfile/EditProfilePage";
import './App.css';
import MyProfile from "./MyProfile/MyProfile";

function App() {
  // const storedToken = localStorage.getItem("token");


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<Nenasa />} />
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/myProfile" element={<MyProfile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
