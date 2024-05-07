import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faComment,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect, FormEvent } from "react";
const moment = require("moment");

interface Comment {
  comment_id: number;
  post_id: number;
  user_id: number;
  username: string;
  content: string;
  profile_picture_url?: string;
  create_time: string; // fix if Date
}

interface Post {
  post_id: number;
  user_id: number;
  username: string;
  content: string;
  profile_picture_url?: string;
  image_url?: string;
  create_time: string; // fix if Date
  likesCount?: number;
}

interface PostProps {
  post: Post;
}

const Post: React.FC<PostProps> = ({ post }) => {
  // State variables to store information
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likesCount || 0);

  // Store user id from token in state variable user
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");

    if (userToken) {
      try {
        const parsedToken = JSON.parse(userToken);
        const userValue = parsedToken.userId;
        setUser(userValue);
      } catch (error) {
        console.error("Error parsing access token:", error);
      }
    } else {
      console.log("Access token not found in local storage");
    }
  });

  // Like posts
  const handleLike = async () => {
    const apiUrl = `http://localhost:3010/posts/${post.post_id}/like`; // Ensure post.post_id is defined and correct
    console.log("API URL:", apiUrl); // Log the URL to verify it

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user }), // Assuming userId is provided somehow; it should ideally come from authenticated session or token
      });

      if (response.ok) {
        const result = await response.json();
        setLiked(result.liked);
        setLikesCount((prev) => (result.liked ? prev + 1 : prev - 1));
        // Inside the try block of handleLike function after confirming the response is ok
        await fetch(`http://localhost:3010/api/stats/update/${user}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ action: "likeCount" }),
        });
      } else {
        throw new Error(
          `Failed to toggle like: ${response.status} ${response.statusText}`
        );
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      alert("An error occurred while submitting the like. Please try again.");
    }
  };

  // Comment on posts
  useEffect(() => {
    if (showComments) {
      fetch(`http://localhost:3010/posts/${post.post_id}/comments`)
        .then((response) => response.json())
        .then((data: Comment[]) => setComments(data))
        .catch(console.error);
    }
  }, [showComments, post.post_id]);

  const handleCommentSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newComment.trim()) {
      alert("Please enter a comment.");
      return;
    }

    console.log("Post ID:", post.post_id, "Comment:", newComment);
    const apiUrl = `http://localhost:3010/posts/${post.post_id}/comments`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user, content: newComment }),
      });

      if (response.ok) {
        const newCommentData = await response.json();
        setComments((prevComments) => [...prevComments, newCommentData]);
        setNewComment("");

        await fetch(`http://localhost:3010/api/stats/update/${user}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ action: "commentCount" }),
        });
      } else {
        const errorText = await response.text();
        console.error("Failed to submit comment:", errorText);
        alert("Failed to submit comment. Please try again.");
      }
    } catch (error) {
      console.error("Network or other error:", error);
      alert(
        "An error occurred while submitting the comment. Please try again."
      );
    }
  };

  console.log("USER", post.user_id);

  return (
    <div
      style={{
        marginBottom: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "15px",
        backgroundColor: "#e5e5e5", // Pink background
        // color: "#6A1B9A", // Dark purple text
        fontSize: "16px",
      }}
    >
      {/* Post Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <img
          src={"/uploads/" + post?.profile_picture_url}
          // src={post.profile_picture_url}
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
          to={`/user/${post.user_id}`}
          style={{ color: "#000", textDecoration: "none" }}
        >
          <strong>{post.username}</strong>
        </Link>
        <span style={{ marginLeft: "auto", color: "#000" }}>
          {moment(post.create_time).format("MMMM D, YYYY h:mm a")}
          {/* {post.create_time} */}
        </span>
      </div>
      {/* Post Content */}
      <p style={{ marginBottom: "10px" }}>{post.content}</p>
      {post.image_url && (
        <img
          // src={post.image_url}
          src={`../uploads/${post?.image_url}`}
          alt="Post"
          style={{
            maxWidth: "100%",
            borderRadius: "8px",
            marginBottom: "10px",
          }}
        />
      )}
      {/* Post Actions */}
      <div
        style={{
          borderTop: "1px solid #ccc",
          paddingTop: "10px",
          display: "flex",
          justifyContent: "space-between",
          color: "#000", // Dark purple for text
        }}
      >
        <button
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: "15px",
            color: "#4A148C",
          }}
          onClick={handleLike}
        >
          <FontAwesomeIcon icon={faThumbsUp} /> {liked ? "Unlike" : "Like"}
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          style={{ display: "flex", alignItems: "center", marginRight: "15px" }}
        >
          <FontAwesomeIcon icon={faComment} /> Comment
        </button>
        <button style={{ display: "flex", alignItems: "center" }}>
          <FontAwesomeIcon icon={faShare} /> Share
        </button>
      </div>
      {/* Comments Section */}
      {showComments && (
        <div>
          {comments.map((comment) => (
            <div
              key={comment.comment_id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between", // Ensures space between elements
                backgroundColor: "#fcfcfc",
                borderRadius: "8px",
                padding: "10px",
                margin: "10px 0",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={"/uploads/" + comment?.profile_picture_url}
                  alt={comment.username}
                  style={{
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                    marginRight: "10px",
                    border: "2px solid #fff",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
                  }}
                />
                <div>
                  <p
                    style={{
                      fontWeight: "bold",
                      color: "#000",
                      margin: 0,
                    }}
                  >
                    <Link
                      to={`/user/${comment.user_id}`}
                      style={{ color: "#000", textDecoration: "none" }}
                    >
                      <strong>{comment.username}</strong>
                    </Link>
                  </p>
                  <p
                    style={{
                      margin: "4px 0 0",
                      color: "#000",
                    }}
                  >
                    {comment.content}
                  </p>
                </div>
              </div>
              <div>
                <p style={{ margin: 0, color: "#999" }}>
                  {moment(comment.create_time).format("MMMM D, YYYY h:mm a")}
                </p>
              </div>
            </div>
          ))}
          <form onSubmit={handleCommentSubmit}>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              style={{
                marginRight: "10px",
                padding: "5px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: "#E1BEE7",
                color: "#000",
                padding: "5px 10px",
                borderRadius: "5px",
                border: "none",
              }}
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Post;
