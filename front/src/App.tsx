import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Casino from "./Casino";
import Login from "./users/Login";
// import Home from "./front/Home";
import Main from "./home/Home";
import Header from "./home/Header";
import SignUp from "./users/Signup";
import GetPet from "./pets/GetPet";
import MyPet from "./pets/MyPet";
import Pet from "./pets/Pet";
import Items from "./items/Items";
import Friend from "./friends/Friend";
import UpdateProfilePage from "./SetProfile/UpdateProfilePage";

function App() {
  // const userToken = localStorage.getItem("userToken");
  // const isAuthenticated = !!userToken;

  return (
    <div>
      <Router>
        {/* should be modified later */}
        {/* <Header/>  */}
        <Routes>
          {/* zubyar */}
          <Route path="/update" element={<UpdateProfilePage />} />
          {/* <Route path="/petgame" element={<SocialPage />} /> */}
          <Route path="/Casino" element={<Casino />} />
          {/* <Route path="/SocialPage" element={<PetGame />} /> */}
          {/* <Route path="/ShopPage" element={<ShopPage />} /> */}
          {/* <Route path="/BoughtFoodPage" element={<BoughtFoodPage />} /> */}
          {/* goni */}
          <Route path="/" element={<Main />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/pet" element={<Pet />}></Route>
          {/* <Route */}
          <Route path="/petget" element={<GetPet />}></Route>
          <Route path="/petmain" element={<MyPet />}></Route>
          <Route path="/items" element={<Items />}></Route>
          <Route path="/friends" element={<Friend />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
