import React, { useState, useEffect } from "react";
import "../style/UpdateProfilePage.css";
import { useNavigate } from "react-router-dom";

interface FormDataEntry {
  name: string;
  value: string | Blob | null;
}

const UpdateProfilePage: React.FC = () => {
  const navigate = useNavigate();

  // Define state variable to store the user value
  const [user, setUser] = useState<string | null>(null);
  // Get the user id from token
  useEffect(() => {
    const userToken = localStorage.getItem("userToken");

    if (userToken) {
      try {
        const parsedToken = JSON.parse(userToken);
        const userValue = parsedToken.userId;
        setUser(userValue);
        console.log(user);
      } catch (error) {
        console.error("Error parsing access token:", error);
      }
    } else {
      console.log("Access token not found in local storage");
    }
  }, [user]);
  // Create form to store the profile information
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    gender: "",
    age: "",
    interests: "",
    bio: "",
    school: "",
    profile_picture: null as Blob | null,
    cover_picture: null as Blob | null,
  });
  // Get the picture files
  const handleProfilePictureChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      profile_picture: event.target.files?.[0] || null,
    });
  };

  const handleCoverPictureChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      cover_picture: event.target.files?.[0] || null,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit all the profile information to the backend endpoint
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        console.log(`Key: ${key}, Value: ${value}, Type: ${typeof value}`); // Log each key and value type
        if (key === "age" && value === "") {
          console.log("Age is blank, skipping");
          return;
        }
        if (
          value !== null &&
          typeof value === "object" &&
          value instanceof Blob
        ) {
          console.log(`Appending blob for key ${key}`);
          formDataToSend.append(key, value);
        } else if (value !== null) {
          console.log(`Appending string value ${value} for key ${key}`);
          formDataToSend.append(key, String(value));
        }
      });
      // Debug what's being sent
      for (let [key, value] of formDataToSend.entries()) {
        console.log(`${key}: ${value}`); // Show what's actually being appended
      }
      if (typeof user === "number") {
        console.log(`Appending id ${user}`);
        formDataToSend.append("id", String(user));
      }

      console.log("Form data to send:", formDataToSend);

      const response = await fetch("http://localhost:8000/updateProfile", {
        method: "PUT",
        body: formDataToSend,
        credentials: "include",
      });
      console.log("Response:", response);
      const data = await response.json();
      console.log("Response data:", data);
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      console.log("Profile updated successfully");
      console.log("Profile Picture URL:", data.profilePictureUrl);
      console.log("Cover Picture URL:", data.coverPictureUrl);
      navigate(`/user/${user}`);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        className="form-input"
      />
      <span>Profile Picture</span>
      <input
        type="file"
        name="profile_picture"
        onChange={handleProfilePictureChange}
        className="form-input"
      />
      <span>Cover Picture</span>
      <input
        type="file"
        name="cover_picture"
        onChange={handleCoverPictureChange}
        className="form-input"
      />
      <input
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="Location"
        className="form-input"
      />
      <textarea
        name="school"
        value={formData.school}
        onChange={handleChange}
        placeholder="School"
        className="form-textarea"
      />
      <input
        type="number"
        name="age"
        value={formData.age}
        onChange={handleChange}
        placeholder="Age"
        className="form-input"
      />
      <input
        type="text"
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        placeholder="Gender"
        className="form-input"
      />
      <input
        type="text"
        name="interests"
        value={formData.interests}
        onChange={handleChange}
        placeholder="Interests"
        className="form-input"
      />
      <textarea
        name="bio"
        value={formData.bio}
        onChange={handleChange}
        placeholder="Bio"
        className="form-textarea"
      />
      <button type="submit" className="form-button">
        Update Profile
      </button>
    </form>
  );
};

export default UpdateProfilePage;
