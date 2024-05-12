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

const FriendBox = () => {
  //   const { userId } = useParams<{ userId: string }>();
  const [following, setFollowing] = useState<Following[]>([]);
  const [profiles, setProfiles] = useState<{ [key: string]: UserProfile }>({});

  const [user, setUser] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if (userToken) {
      try {
        const parsedToken = JSON.parse(userToken);
        const userValue = parsedToken.userId;
        const username = parsedToken.username;
        setUser(userValue);
        setUserName(username);
      } catch (error) {
        console.error("Error parsing access token:", error);
      }
    }
  }, []);

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const response = await fetch(`http://localhost:8000/following/${user}`);
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
  }, [user]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          overflowX: "auto",
          whiteSpace: "nowrap",
          maxWidth: "100%",
          padding: "5px 0",
        }}
      >
        <ul
          style={{
            display: "flex",
            flexDirection: "row",
            listStyleType: "none",
            padding: 0,
            margin: 0,
            alignItems: "center",
          }}
        >
          {following.map((follow) => (
            <li
              key={follow.followedUser}
              style={{
                textAlign: "center",
                minWidth: "120px",
                marginRight: "10px",
                flexShrink: 0, // Prevents shrinking of the item in flex layout
              }}
            >
              <img
                src={
                  "uploads/" +
                  (profiles[follow.followedUser]?.profilePictureUrl ||
                    defaultImage)
                }
                alt="Profile"
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: "50%",
                  display: "block",
                  margin: "auto",
                }}
              />
              {profiles[follow.followedUser] ? (
                <Link to={`/user/${profiles[follow.followedUser].id}`}>
                  {profiles[follow.followedUser].username}
                </Link>
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

export { FriendBox };
