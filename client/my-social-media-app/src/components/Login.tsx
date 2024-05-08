import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3010/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const user = await response.json();

        console.log("USER", user);
        // Access the id from the user object
        const userId = user.user;

        // Create a token containing user information
        const token = JSON.stringify({
          username: user.username,
          userId: userId,
          picture: user.picture,
        });

        // Store the token in localStorage
        localStorage.setItem("userToken", token);
        console.log("NAME:  ", token);
        if (user.name) {
          console.log("inside");
          navigate("/home"); // Navigate to the update profile page if name is blank
        } else {
          navigate("/update"); // Navigate to the home page if name is filled
        }
      } else {
        alert("Failed to login");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#A64AC9",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1 style={{ color: "white", fontSize: "32px", marginBottom: "0" }}>
        Pet Paradise
      </h1>
      <h2 style={{ color: "white", fontSize: "24px", marginTop: "0" }}>
        Login
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
          background: "rgba(255, 192, 203, 0.8)",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ margin: "10px 0", padding: "8px", borderRadius: "4px" }}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ margin: "10px 0", padding: "8px", borderRadius: "4px" }}
          />
        </label>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#C864C9",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
        <p style={{ color: "#A64AC9" }}>
          Create an account{" "}
          <a href="/register" style={{ color: "#FF69B4" }}>
            here
          </a>
          .
        </p>
      </form>
    </div>
  );
}

export default Login;
