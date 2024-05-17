// NOT USED

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavigationBar from "./NavigationBar";

interface Follower {
  followingUser: string;
}

const Follower = () => {
  const { userId } = useParams<{ userId: string }>();
  const [followers, setFollowers] = useState<Follower[]>([]);

  useEffect(() => {
    fetch(`http://localhost:8000/followers/${userId}`)
      .then((response) => response.json())
      .then((data) => setFollowers(data))
      .catch((err) => console.error("Error fetching followers:", err));
  }, [userId]);

  return (
    <>
      <NavigationBar />
      <div style={{ position: "fixed", top: "70px" }}>
        <h1>Followers</h1>
        <ul>
          {followers.map((follower) => (
            <li key={follower.followingUser}>{follower.followingUser}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export { Follower };
