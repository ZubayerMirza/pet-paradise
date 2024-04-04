import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PetGame from "./PetGame";
import Casino from "./Casino";
import Login from "./users/Login";
// import Home from "./front/Home";
import Main from "./home/Home";
import SignUp from "./users/Signup";
import GetPet from "./pets/GetPet";
import MyPet from "./pets/MyPet";
import Pet from "./pets/Pet";
import Items from "./items/Items";

function App() {
  return (
    <div>
      <Router>
        <Routes>
        <Route path="/petgame" element={<PetGame />} />
        <Route path="/Casino" element={<Casino />} />
        
        {/* goni */}
        <Route path="/" element={<Main />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/pet" element={<Pet />}></Route>
        <Route path="/petget" element={<GetPet />}></Route>
        <Route path="/petmain" element={<MyPet />}></Route>
        <Route path="/items" element={<Items />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
