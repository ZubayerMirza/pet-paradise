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
  const { userId } = useParams<{ userId: string }>();

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:3010/api/stats/${userId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => setStats(data))
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    }
  }, [userId]);

  return (
    <>
      <NavigationBar />
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
