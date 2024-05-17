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
import Stats from "./components/Stats";
import { Following } from "./components/Following";
import { Follower } from "./components/Follower";
import AllUsers from "./components/AllUsers";
import Profile from "./components/Profile";
import UpdateProfilePage from "./components/UpdateProfilePage";
import History from "./components/History";
import Battle from "./components/Battle";
import BattleUsers from "./components/BattleUsers";
import Leaderboard from "./components/Leaderboard";

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
          <Route path="/following/:userId" element={<Following />} />
          <Route path="/follower/:userId" element={<Follower />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/user/:userId" element={<Profile />} />
          <Route path="/stats/:userId" element={<Stats />} />
          <Route path="/history/:userId" element={<History />} />
          <Route path="/battle" element={<BattleUsers />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/battle/:userId" element={<Battle />} />

          {/* <Route path="/petgame" element={<SocialPage />} /> */}
          <Route path="/Casino" element={<Casino />} />
          {/* <Route path="/SocialPage" element={<PetGame />} /> */}
          {/* <Route path="/ShopPage" element={<ShopPage />} /> */}
          {/* <Route path="/BoughtFoodPage" element={<BoughtFoodPage />} /> */}
          {/* goni */}
          <Route path="/" element={<Login />}></Route>
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
