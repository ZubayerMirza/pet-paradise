// Alternate version of the Stats.tsx code
// Used with a use effect to automatically update every 5 seconds

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavigationBar from "./NavigationBar";

interface Stats {
  userId: number;
  postCount: number;
  commentCount: number;
  likeCount: number;
  friendCount: number;
  shareCount: number;
}

const Stats = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  //   const { userId } = useParams<{ userId: string }>();
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
  console.log("USER: ", user);

  useEffect(() => {
    if (user) {
      const interval = setInterval(() => {
        fetch(`http://localhost:8000/api/stats/${user}`)
          .then((response) => response.json())
          .then((data) => setStats(data))
          .catch((error) => console.error("Error fetching data: ", error));
      }, 5000); // Fetch every 5000 milliseconds (5 seconds)

      return () => clearInterval(interval); // Clear interval on component unmount
    }
  }, [user]);

  return (
    <>
      <div style={{ marginTop: "70px" }}>
        {stats ? (
          <ul>
            <li>Posts: {stats.postCount}</li>
            <li>Comments: {stats.commentCount}</li>
            <li>Likes: {stats.likeCount}</li>
            <li>Friends: {stats.friendCount}</li>
            <li>Shares: {stats.shareCount}</li>
          </ul>
        ) : (
          <p>Loading stats or no stats available.</p>
        )}
      </div>
    </>
  );
};

export default Stats;
