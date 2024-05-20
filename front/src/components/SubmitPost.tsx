// Frontend for submit box component

import React, { useState, useEffect, useRef } from "react";
import { debounce } from "lodash";
import "../style/SubmitPost.css"; // Import the CSS file for styling

interface SubmitPostProps {
  onNewPost: (newPost: any) => void; // Define a more specific type if possible
}

// Submit Post Code
// Creates a submit box that posts to the post table with content and username
const SubmitPost: React.FC<SubmitPostProps> = ({ onNewPost }) => {
  const [postContent, setPostContent] = useState("");
  const [user, setUser] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userToken = localStorage.getItem("userToken");
      if (userToken) {
        try {
          const parsedToken = JSON.parse(userToken);
          const username = parsedToken.username;
          setUserName(username);
          setUser(parsedToken.userId);
        } catch (error) {
          console.error("Error parsing access token:", error);
        }
      }
    };

    fetchUserData();
  }, []);

  // Handle function to submit the post to the database
  const handlePostSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!postContent || !user) {
      console.error("Post content or user ID is missing.");
      return;
    }
    // Using Formdata to take the information
    const formData = new FormData();
    formData.append("content", postContent);
    formData.append("id", user);
    if (file) {
      formData.append("image", file);
    }

    try {
      const response = await fetch("http://localhost:8000/posts", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const newPost = await response.json();
      onNewPost(newPost);
      setPostContent("");
      setFile(null);
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };
  // Displays the frontend for the Post Box
  return (
    <div className="post-container">
      <h4>Post Your Thoughts, {userName}</h4>
      <form onSubmit={handlePostSubmit} className="post-form">
        <textarea
          className="post-textarea"
          placeholder="What's on your mind?"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setFile(e.target.files[0]);
            }
          }}
          className="file-input"
        />
        <button type="submit" className="submit-button">
          Share
        </button>
      </form>
    </div>
  );
};

export default SubmitPost;
