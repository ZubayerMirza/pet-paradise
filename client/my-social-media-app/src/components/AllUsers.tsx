import React, { useEffect, useState } from "react";
import NavigationBar from "./NavigationBar";

interface User {
  user_id: number;
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
      <div
        style={{
          position: "relative",

          top: "70px",
        }}
      >
        <h1>Users</h1>
        <ul>
          {users.map((user) => (
            <li key={user.user_id}>
              <img
                src={user.profile_picture_url}
                alt={user.username}
                style={{ width: 50, height: 50 }}
              />
              <p>ID: {user.user_id}</p>
              <p>Username: {user.username}</p>
              <p>Name: {user.name}</p>
              <p>Age: {user.age}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default AllUsers;
