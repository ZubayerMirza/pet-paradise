// Display all the users that you can battle
// Similar structure to AllUsers

import React, { useEffect, useState } from "react";
import NavigationBar from "./NavigationBar";
import "../style/AllUsers.css";

// User variables
interface User {
  id: number;
  username: string;
  name: string;
  age: number;
  profilePictureUrl: string;
}

// Create a page that has all the users you can battle
// Contains their profile picture, user name.
// Click on username to battle
function BattleUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<number | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    // Fetch current user from local storage
    const userToken = localStorage.getItem("userToken");
    if (userToken) {
      try {
        const parsedToken = JSON.parse(userToken);
        const username = parsedToken.username;
        setUserName(username);
        setCurrentUser(parsedToken.userId);
      } catch (error) {
        console.error("Error parsing user token:", error);
      }
    }
  }, []);

  useEffect(() => {
    // Fetch all users from the API
    fetch("http://localhost:8000/users")
      .then((response) => response.json())
      .then((data) => {
        // Filter out the current user from the list of all users
        if (currentUser) {
          const otherUsers = data.filter(
            (user: User) => user.id !== currentUser
          );
          setUsers(otherUsers);
        }
      })
      .catch((error) => console.error("Error:", error));
  }, [currentUser]);

  return (
    <>
      <NavigationBar />
      <div className="users-container">
        <h1>Choose your opponent, {userName}!</h1>
        <div className="user-grid">
          {users.map((user) => (
            <div className="user-card" key={user.id}>
              <img
                src={`/uploads/${user.profilePictureUrl}`}
                alt={user.username}
                className="profile-pic"
              />
              <div className="user-info">
                <a href={`/battle/${user.id}`} className="user-link">
                  {user.username}
                </a>
                <p>{user.name}</p>
                <p>Age: {user.age}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default BattleUsers;
