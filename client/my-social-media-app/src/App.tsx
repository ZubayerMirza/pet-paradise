import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import React, { useState } from "react";

import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Register from "./components/Register";
import UpdateProfilePage from "./components/UpdateProfilePage";
import Stats from "./components/Stats";
import { Following } from "./components/Following";
import { Follower } from "./components/Follower";
import AllUsers from "./components/AllUsers";

function App() {
  const userToken = localStorage.getItem("userToken");

  // Determine whether to allow access to Home and Profile based on the presence of userToken
  const isAuthenticated = !!userToken;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />

        <Route path="/login" element={<Login />} />

        {/* Conditionally render Home or Redirect to Login */}
        <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />

        {/* Conditionally render Profile or Redirect to Login */}
        <Route
          path="/user/:userId"
          element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/stats/:userId"
          element={isAuthenticated ? <Stats /> : <Navigate to="/login" />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/update" element={<UpdateProfilePage />} />
        <Route path="/following/:userId" element={<Following />} />
        <Route path="/follower/:userId" element={<Follower />} />
        <Route path="/all-users" element={<AllUsers />} />
      </Routes>
    </Router>
  );
}

export default App;
