// Page that displays the leaderboard information

import React, { useEffect, useState } from "react";
import NavigationBar from "./NavigationBar";
import "../style/Leaderboard.css";

interface User {
  id: number;
  username: string;
  name: string;
  age: number;
  profilePictureUrl: string;
}

interface LeaderboardUser extends User {
  wins: number;
}

function Leaderboard() {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);

  useEffect(() => {
    // Fetch leaderboard data from the API
    fetch("http://localhost:8000/leaderboard")
      .then((response) => response.json())
      .then(setUsers)
      .catch((error) =>
        console.error("Error fetching leaderboard data:", error)
      );
  }, []);

  return (
    <div>
      <NavigationBar />
      <div className="users-container">
        <h1>Leaderboard</h1>
        <div className="user-grid">
          {users.map((user, index) => (
            <div className="user-card" key={user.id}>
              <div className="rank">{index + 1}</div>
              <img
                src={`/uploads/${user.profilePictureUrl}`}
                alt={user.username}
                className="profile-pic"
              />
              <div className="user-info">
                <a href={`/user/${user.id}`} className="user-link">
                  {user.username}
                </a>
                <p>{user.name}</p>
                <p>Age: {user.age}</p>
                <p>Wins: {user.wins}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
