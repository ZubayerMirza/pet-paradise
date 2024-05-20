// Displays stat information and level

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import "../style/Stats.css";

interface Stats {
  userId: number;
  postCount: number;
  commentCount: number;
  likeCount: number;
  friendCount: number;
  shareCount: number;
}

// Fetch the user stats from the user_stats table
const Stats = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const { userId } = useParams<{ userId: string }>();
  const [level, setLevel] = useState<number>(0);

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:8000/api/stats/${userId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setStats(data);
          calculateLevel(data);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    }
  }, [userId]);

  // Create the level based on the user stats
  const calculateLevel = (data: Stats) => {
    const totalInteractions =
      data.postCount +
      data.commentCount +
      data.likeCount +
      data.friendCount +
      data.shareCount;
    const multiplier = 0.5; // Adjust this multiplier based on desired level progression
    const calculatedLevel = Math.floor(totalInteractions * multiplier);
    setLevel(calculatedLevel);
  };
  // Display the user stats infomation depending on the user and also the calculated level
  return (
    <>
      <NavigationBar />
      <div className="stats-container">
        <h1>User Stats</h1>
        {stats ? (
          <>
            <ul className="stats-list">
              <li>Posts: {stats.postCount}</li>
              <li>Comments: {stats.commentCount}</li>
              <li>Likes: {stats.likeCount}</li>
              <li>Friends: {stats.friendCount}</li>
              {/* Optionally display shares */}
              {/* <li>Shares: {stats.shareCount}</li> */}
            </ul>
            <h2>Level: {level}</h2>
          </>
        ) : (
          <p>Loading stats or no stats available.</p>
        )}
      </div>
    </>
  );
};

export default Stats;
