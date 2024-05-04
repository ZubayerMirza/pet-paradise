import React, { useState } from "react";
import "./WallPostPage.css";

const WallPostPage: React.FC = () => {
  const [textInput, setTextInput] = useState<string>("");
  const [posts, setPosts] = useState<string[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextInput(event.target.value);
  };

  const handlePost = () => {
    if (textInput.trim() !== "") {
      setPosts([...posts, textInput]);
      setTextInput("");
    }
  };

  return (
    <div className="wall-post-container">
      <h2>Wall</h2>
      <div>
        <textarea
          className="text-area"
          rows={4}
          value={textInput}
          onChange={handleInputChange}
          placeholder="What's on your mind?"
        />
      </div>
      <div>
        <button className="post-button" onClick={handlePost}>
          Post
        </button>
      </div>
      <div>
        {posts.map((post, index) => (
          <div key={index} className="post">
            <p>{post}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WallPostPage;
