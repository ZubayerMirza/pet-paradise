import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavigationBar from "./NavigationBar";

interface Following {
  followedUser: string;
}

const Following = () => {
  const { userId } = useParams<{ userId: string }>();
  const [following, setFollowing] = useState<Following[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3010/following/${userId}`)
      .then((response) => response.json())
      .then((data) => setFollowing(data))
      .catch((err) => console.error("Error fetching following:", err));
  }, [userId]);

  return (
    <>
      <NavigationBar />
      <div style={{ position: "fixed", top: "70px" }}>
        <h1>Following</h1>
        <ul>
          {following.map((follow) => (
            <li key={follow.followedUser}>{follow.followedUser}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export { Following };
