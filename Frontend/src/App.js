import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nenasa from "./components/Nenasa";
import LoginPage from "./login/LoginPage";
import EditProfile from "./editProfile/EditProfilePage";
import MyQuestions from "./ViewmyQuestions/MyQuestions";
import './App.css';

function App() {
  // const storedToken = localStorage.getItem("token");


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<Nenasa />} />
          <Route path="/editProfile" element={<EditProfile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
