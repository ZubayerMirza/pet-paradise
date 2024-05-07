import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import catImage from "../images/cat.png";

const NavigationBar: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [picture, setPicture] = useState<string | null>(null); // State variable for user's picture

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if (userToken) {
      try {
        const parsedToken = JSON.parse(userToken);
        setUser(parsedToken.userId);
        setUserName(parsedToken.username);
        setPicture(parsedToken.picture); // Set picture state
      } catch (error) {
        console.error("Error parsing access token:", error);
      }
    }
  }, []);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      navigate("/all-users");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setUser(null);
    setUserName(null);
    setPicture(null); // Clear picture state on logout
    navigate("/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#91a3b0",
        position: "fixed",
        width: "100%",
        top: 0,
        left: 0,
        boxSizing: "border-box",
        zIndex: 1000,
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={catImage}
          alt="Cat"
          style={{ height: "40px", marginRight: "10px" }}
        />
        <span style={{ fontWeight: "bold", fontSize: "1.2em" }}>
          Pet Paradise
        </span>
      </div>
      <input
        type="text"
        placeholder="Search"
        style={{ width: "500px", padding: "8px 10px" }}
        onKeyDown={handleKeyDown}
      />
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <FontAwesomeIcon
          icon={faHome}
          onClick={() => handleNavigation("/home")}
          style={{ cursor: "pointer" }}
        />
        <FontAwesomeIcon
          icon={faUser}
          onClick={() => handleNavigation(`/user/${user}`)}
          style={{ cursor: "pointer" }}
        />
        <FontAwesomeIcon
          icon={faSignOutAlt}
          onClick={handleLogout}
          style={{ cursor: "pointer" }}
        />
        {userName && (
          <span
            style={{
              padding: "0 10px",
              fontWeight: "bold",
              fontSize: "1.5em",
              color: "#ffffff",
            }}
          >
            {userName}
          </span>
        )}
        {picture && (
          <img
            src={`/uploads/${picture}`}
            alt="User"
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;
