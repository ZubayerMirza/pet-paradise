// Page that displays all the users that have registered for the site

import React, { useEffect, useState } from "react";
import NavigationBar from "./NavigationBar";
import "../style/AllUsers.css";

// interface to store information about User
interface User {
  id: number;
  username: string;
  name: string;
  age: number;
  profilePictureUrl: string;
}

// Returns a grid of users with information such as username, age, and profile picture
function AllUsers() {
  // store the users in a state variable
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/users")
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default AllUsers;
