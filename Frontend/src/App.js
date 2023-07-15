import './App.css';
import Nenasa from './components/Nenasa';
import LoginPage from "./login/LoginPage";
import EditProfile from './editProfile/EditProfilePage';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
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
