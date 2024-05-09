import React, { useEffect, useState } from "react";
import SubmitPost from "./SubmitPost";
import Post from "./Post";

type PostType = {
  postId: number;
  userId: number;
  username: string;
  content: string;
  imageUrl?: string;
  profilePictureUrl?: string;
  createTime: string;
};

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userToken = localStorage.getItem("userToken");
      if (userToken) {
        try {
          const parsedToken = JSON.parse(userToken);
          setUser(parsedToken.userId);
          console.log("User ID:", parsedToken.userId);
        } catch (error) {
          console.error("Error parsing access token:", error);
        }
      } else {
        console.log("No access token found in local storage.");
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    fetch("http://localhost:3010/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  return (
    <div
      style={{
        padding: "10px",
        position: "relative",
        top: "70px",
      }}
    >
      <SubmitPost
        onNewPost={(newPost) =>
          setPosts((currentPosts) => [newPost, ...currentPosts])
        }
      />
      <h4>News Feed</h4>
      {posts.map((post) => (
        <Post key={post.postId} post={post} />
      ))}
    </div>
  );
};

export default Feed;
