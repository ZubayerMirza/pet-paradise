import React, { useEffect, useState } from "react";
import NavigationBar from "./NavigationBar";
import "../style/AllUsers.css"; // Import a CSS file for styles

interface User {
  id: number;
  username: string;
  name: string;
  age: number;
  profile_picture_url: string;
}

function AllUsers() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("http://localhost:3010/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <>
      <NavigationBar />
      <div className="users-container">
        <h1>Users</h1>
        <div className="user-grid">
          {users.map((user) => (
            <div className="user-card" key={user.id}>
              <img
                src={`/uploads/${user.profile_picture_url}`}
                alt={user.username}
                className="profile-pic"
              />
              <div className="user-info">
                <a href={`/user/${user.id}`} className="user-link">
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

export default AllUsers;
