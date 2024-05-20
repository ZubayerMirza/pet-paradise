// Profile Page display information stored on the database

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../style/ProfilePage.css";
import NavigationBar from "./NavigationBar";
import { useNavigate } from "react-router-dom";
import profilePic from "../uploads/1714688439006-person.jpg";

// Data for the user's profile
interface UserProfile {
  id: string;
  name: string;
  email: string;
  location: string;
  gender: string;
  age: number;
  interests: string;
  bio: string;
  school: string;
  coverPicture: string | null;
  profilePictureUrl: string | null;
}

const Profile: React.FC = () => {
  const navigate = useNavigate();
  // Get the userId
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");

    if (userToken) {
      try {
        const parsedToken = JSON.parse(userToken);
        const userValue = parsedToken.userId;
        setUser(userValue);
      } catch (error) {
        console.error("Error parsing access token:", error);
      }
    } else {
      console.log("Access token not found in local storage");
    }
  }, [user]);

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const { userId } = useParams<{ userId: string }>(); // Extract userId from URL

  useEffect(() => {
    // Fetch profile data from the backend
    const fetchProfile = async () => {
      try {
        if (userId) {
          const response = await fetch(
            `http://localhost:8000/api/user/${userId}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch user profile");
          }
          const data = await response.json(); // Directly receive the object
          setProfile(data);
          console.log("Fetched profile data:", data);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchProfile();
  }, [userId]);

  // Check the state of following
  const [isFollowing, setIsFollowing] = useState(false);
  const followedUser = userId;
  const isOwnProfile = followedUser == user; // Compare if the logged-in user is the same as the profile user

  useEffect(() => {
    if (!user || !followedUser) {
      console.log("Missing user IDs, skipping fetch.");
      return; // Avoid making requests without necessary IDs
    }

    const url = `http://localhost:8000/friendships?followedUser=${followedUser}&followingUser=${user}`;
    console.log(
      `Checking friendship status between ${user} and ${followedUser}`
    );

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // Assuming data is an object and not an array
        if (data && data.status === "active") {
          console.log("Active friendship found:", data);
          setIsFollowing(true);
        } else {
          console.log(
            "No active friendship or unexpected data structure:",
            data
          );
          setIsFollowing(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching friendship status:", error);
        setIsFollowing(false); // Assume not following
      });
  }, [followedUser, user]);

  const handleFollow = () => {
    const method = isFollowing ? "DELETE" : "POST";
    fetch("http://localhost:8000/friendships", {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ followedUser, followingUser: user }),
    })
      .then(async (response) => {
        if (response.ok) {
          setIsFollowing(!isFollowing);
          // Update friend count
          await fetch(`http://localhost:8000/api/stats/update/${user}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ action: "friendCount" }),
          });
        } else {
          throw new Error("Failed to update friendship status");
        }
      })
      .catch((error) =>
        console.error("Error updating friendship status:", error)
      );
  };
  // Display the profile
  return (
    <>
      <NavigationBar />
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          backgroundColor: "antiquewhite",
          minHeight: "100vh",
          padding: "20px",
          margin: "0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          top: "50px",
        }}
      >
        <div
          style={{
            width: "100%",
            borderRadius: "8px",
            marginBottom: "10px",
            overflow: "hidden",
          }}
        >
          <img
            // src={profile?.cover_picture || "default-cover-url"}
            src={`/uploads/${profile?.coverPicture}`}
            alt={`${profile?.name}'s Cover`}
            style={{ width: "100%", height: "200px", objectFit: "cover" }}
          />
        </div>
        <div style={{ textAlign: "center", color: "#000" }}>
          <img
            src={"/uploads/" + profile?.profilePictureUrl}
            alt={`${profile?.name}`}
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              borderRadius: "50%",
              border: "3px solid #AA00FF",
              marginBottom: "10px",
            }}
          />
          <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "#000" }}>
            {profile?.name}
          </h1>
          <div style={{ fontSize: "16px" }}>
            <p style={{ color: "#000", marginBottom: "4px" }}>
              {isOwnProfile ? null : (
                // (
                //   <button
                //     onClick={() => navigate("/update")}
                //     style={{
                //       backgroundColor: "#C51162",
                //       color: "white",
                //       border: "none",
                //       borderRadius: "5px",
                //       padding: "8px 16px",
                //       cursor: "pointer",
                //     }}
                //   >
                //     Update Profile
                //   </button>
                // )
                <button
                  onClick={handleFollow}
                  style={{
                    backgroundColor: "#D81B60",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    padding: "8px 16px",
                    cursor: "pointer",
                  }}
                >
                  {isFollowing ? "Unfollow" : "Follow"}
                </button>
              )}
            </p>
            <p>
              <strong style={{ color: "#6A1B9A" }}>Email:</strong>{" "}
              <span style={{ color: "#AD1457" }}>{profile?.email}</span>
            </p>
            <p>
              <strong style={{ color: "#6A1B9A" }}>Location:</strong>{" "}
              <span style={{ color: "#AD1457" }}>{profile?.location}</span>
            </p>
            <p>
              <strong style={{ color: "#6A1B9A" }}>School:</strong>{" "}
              <span style={{ color: "#AD1457" }}>{profile?.school}</span>
            </p>
            <p>
              <strong style={{ color: "#6A1B9A" }}>Gender:</strong>{" "}
              <span style={{ color: "#AD1457" }}>{profile?.gender}</span>
            </p>
            <p>
              <strong style={{ color: "#6A1B9A" }}>Age:</strong>{" "}
              <span style={{ color: "#AD1457" }}>{profile?.age}</span>
            </p>
            <p>
              <strong style={{ color: "#6A1B9A" }}>Interests:</strong>{" "}
              <span style={{ color: "#AD1457" }}>{profile?.interests}</span>
            </p>
            <p>
              <strong style={{ color: "#6A1B9A" }}>Bio:</strong>{" "}
              <span style={{ color: "#AD1457" }}>{profile?.bio}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
