import React, { useState, useEffect } from "react";

// Props interface definition
interface SubmitPostProps {
  onNewPost: (newPost: any) => void; // The type here should be the actual type of your post
}

const SubmitPost: React.FC<SubmitPostProps> = ({ onNewPost }) => {
  const [postContent, setPostContent] = useState("");
  const [user, setUser] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null); // State to handle the file input

  useEffect(() => {
    const fetchUserData = async () => {
      const userToken = localStorage.getItem("userToken");
      if (userToken) {
        try {
          const parsedToken = JSON.parse(userToken);
          const userValue = parsedToken.userId;
          setUser(userValue);
          console.log(userValue); // Ensure userValue is not null
        } catch (error) {
          console.error("Error parsing access token:", error);
        }
      } else {
        console.log("Access token not found in local storage");
      }
    };

    fetchUserData();
  }, []);

  const handlePostSubmit = async (event: any) => {
    event.preventDefault();
    console.log("Form submitted");

    if (!postContent || !user) {
      console.error("Post content or user ID is missing.");
      console.log("Post Content:", postContent, "User:", user);
      return;
    }

    const formData = new FormData();
    formData.append("content", postContent);
    formData.append("user_id", user);
    if (file) {
      formData.append("image", file);
      console.log("File uploaded:", file.name);
    } else {
      console.log("No file uploaded.");
    }

    try {
      console.log("Sending data to the server...");
      const response = await fetch("http://localhost:3010/posts", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }

      const newPost = await response.json();
      console.log("New post created:", newPost);
      onNewPost(newPost);
      setPostContent("");
      setFile(null);
      // window.location.reload();

      // Update post count after successful post creation
      await fetch(`http://localhost:3010/api/stats/update/${user}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "postCount" }),
      });
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "10px",
        borderRadius: "10px",
        marginBottom: "20px",
      }}
    >
      <form
        onSubmit={handlePostSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <textarea
          placeholder="What's on your mind?"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          style={{ margin: "10px 0", padding: "10px" }}
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files![0])} // Assuming there's always at least one file selected
          style={{ margin: "10px 0" }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#4267B2",
            color: "white",
            padding: "10px 15px",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Share
        </button>
      </form>
    </div>
  );
};
export default SubmitPost;
