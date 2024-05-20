// Displays a history of your posts

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import moment from "moment";
import NavigationBar from "./NavigationBar";

// Store the post data in interface
interface Post {
  postId: number;
  userId: number;
  content: string;
  imageUrl: string;
  createdAt: string;
  username: string;
  profilePictureUrl: string;
}

const History: React.FC = () => {
  // State variables to store information about user and posts
  const { userId } = useParams<{ userId: string }>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // Endpoint to get all of a user's posts
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:8000/user-posts/${userId}`
        );
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts", error);
      }
      setLoading(false);
    };

    fetchPosts();
  }, [userId]);

  if (loading) return <div>Loading...</div>;

  // Display the posts one after another in the History page
  return (
    <>
      <NavigationBar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          top: "50px",
          backgroundColor: "antiquewhite",
          // height: "100%",
        }}
      >
        <h1>User's Posts</h1>
        {posts.map((post) => (
          <div
            key={post.postId}
            style={{
              marginBottom: "20px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "15px",
              backgroundColor: "#d2b48c",
              fontSize: "16px",
              width: "80%", //limit the width
              maxWidth: "600px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <img
                src={`/uploads/${post.profilePictureUrl}`}
                alt={post.username}
                style={{
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  marginRight: "10px",
                  border: "2px solid #000",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
                }}
              />
              <Link
                to={`/user/${post.userId}`}
                style={{ color: "#000", textDecoration: "none" }}
              >
                <strong>{post.username}</strong>
              </Link>
              <span style={{ marginLeft: "auto", color: "#000" }}>
                {moment(post.createdAt).format("MMMM D, YYYY h:mm a")}
              </span>
            </div>
            <p style={{ marginBottom: "10px" }}>{post.content}</p>
            {post.imageUrl && (
              <img
                src={`/uploads/${post.imageUrl}`}
                alt="Post"
                style={{
                  maxWidth: "100%",
                  borderRadius: "8px",
                  marginBottom: "10px",
                }}
              />
            )}
            <div
              style={{
                borderTop: "1px solid #ccc",
                paddingTop: "10px",
                display: "flex",
                justifyContent: "space-between",
                color: "#000",
              }}
            >
              {/* Add post actions here */}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default History;
