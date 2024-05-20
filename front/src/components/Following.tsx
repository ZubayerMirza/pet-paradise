// Display page for users you follow

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import defaultImage from "./default.jpg";

interface Following {
  followedUser: string;
}

interface UserProfile {
  id: string;
  username: string;
  profilePictureUrl: string;
}
// Display the followers
const Following = () => {
  const { userId } = useParams<{ userId: string }>();
  const [following, setFollowing] = useState<Following[]>([]);
  const [profiles, setProfiles] = useState<{ [key: string]: UserProfile }>({});

  // Use endpoint to get the data
  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/following/${userId}`
        );
        const data = await response.json();
        setFollowing(data);
        data.forEach(async (follow: Following) => {
          const profileResponse = await fetch(
            `http://localhost:8000/api/user/${follow.followedUser}`
          );
          const profileData = await profileResponse.json();
          setProfiles((prev) => ({
            ...prev,
            [follow.followedUser]: profileData,
          }));
        });
      } catch (err) {
        console.error("Error fetching following:", err);
      }
    };
    fetchFollowing();
  }, [userId]);
  // display the followers
  return (
    <>
      <NavigationBar />
      <div style={{ position: "fixed", top: "70px" }}>
        <h1>Friends</h1>
        <ul>
          {following.map((follow) => (
            <li key={follow.followedUser}>
              {profiles[follow.followedUser] ? (
                <>
                  <Link to={`/user/${profiles[follow.followedUser].id}`}>
                    {profiles[follow.followedUser].username}
                  </Link>
                  <img
                    src={
                      profiles[follow.followedUser]?.profilePictureUrl ||
                      defaultImage
                    }
                    // src={profiles[follow.followedUser].profilePictureUrl}
                    alt="Profile"
                    style={{ height: 50, borderRadius: "50%" }}
                  />
                </>
              ) : (
                <span>Loading...</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export { Following };
