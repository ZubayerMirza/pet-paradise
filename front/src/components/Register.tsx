import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Network response was not ok");
      }
      console.log(data.message);
      // Redirect to login page
      navigate("/login");
    } catch (error: any) {
      console.error("Registration failed:", error);
      setError(error.message || "An unknown error occurred.");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#FF69B4",
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
        Register
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
          background: "#A64AC9",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        {error && (
          <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
        )}
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            style={{ margin: "10px 0", padding: "8px", borderRadius: "4px" }}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ margin: "10px 0", padding: "8px", borderRadius: "4px" }}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ margin: "10px 0", padding: "8px", borderRadius: "4px" }}
          />
        </label>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "white",
            color: "#A64AC9",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Register
        </button>
        <p style={{ color: "white" }}>
          Already have an account?{" "}
          <a
            href="/login"
            style={{ color: "white", textDecoration: "underline" }}
          >
            Log in here
          </a>
          .
        </p>
      </form>
    </div>
  );
};

export default Register;
