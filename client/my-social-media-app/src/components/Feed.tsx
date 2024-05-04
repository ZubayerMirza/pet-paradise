import React, { useEffect, useState, useCallback } from "react";
import SubmitPost from "./SubmitPost";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faComment,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import Post from "./Post";
import { debounce } from "lodash"; // You might need to install lodash for this

type PostType = {
  post_id: number;
  user_id: number;
  username: string;
  content: string;
  image_url?: string;
  profile_picture_url?: string;
  create_time: string;
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
          const userValue = parsedToken.userId;
          setUser(userValue);
          console.log(userValue);
        } catch (error) {
          console.error("Error parsing access token:", error);
        }
      } else {
        console.log("Access token not found in local storage");
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

  const addNewPost = useCallback(
    debounce(async (newPost: any) => {
      console.log(newPost.content);

      try {
        const apiUrl = "http://localhost:3010/posts";
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: user, content: newPost.content }),
        });
        if (!response.ok) {
          throw new Error("Failed to create new post");
        }
        const data = await response.json();
        console.log("New post created:", data);
        setPosts((currentPosts) => [data, ...currentPosts]);
      } catch (error) {
        console.error("Error creating new post:", error);
      }
    }, 300),
    [user]
  ); // Adjust debounce time as needed

  return (
    <div
      style={{
        padding: "10px",
        position: "relative",
        top: "70px",
      }}
    >
      <SubmitPost onNewPost={addNewPost} />
      <h4>News Feed</h4>
      {posts.map((post) => (
        <Post key={post.post_id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
