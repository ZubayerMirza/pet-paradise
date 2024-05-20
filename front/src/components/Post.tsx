// Component that creates the posts

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartEmpty } from "@fortawesome/free-regular-svg-icons";
import {
  faHeart as faHeartFull,
  faComment,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect, FormEvent } from "react";
const moment = require("moment");

// Data for the comment
interface Comment {
  commentId: number;
  postId: number;
  userId: number;
  username: string;
  content: string;
  profilePictureUrl?: string;
  create_time: string; // fix if Date
}

// Data for the post
interface Post {
  postId: number;
  userId: number;
  username: string;
  content: string;
  profilePictureUrl?: string;
  imageUrl?: string;
  createTime: string; // fix if Date
  likesCount?: number;
}

// Take props as the Post interface
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
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/posts/${post.postId}/like/${user}`
        );
        if (response.ok) {
          const result = await response.json();
          setLiked(result.liked);
        } else {
          throw new Error(
            `Failed to fetch likes: ${response.status} ${response.statusText}`
          );
        }
      } catch (error) {
        console.error("Error fetching likes:", error);
        alert("An error occurred while fetching likes.");
      }
    };

    if (user) {
      fetchLikes();
    }
  }, [post.postId, user]);

  // Update handleLike function to toggle like status
  const handleLike = async () => {
    const apiUrl = `http://localhost:8000/posts/${post.postId}/like`;
    console.log("API URL:", apiUrl);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user }),
      });

      if (response.ok) {
        const result = await response.json();
        setLiked(result.liked);
        setLikesCount((prev) => (result.liked ? prev + 1 : prev - 1));
        // Update the like count on the server
        await fetch(`http://localhost:8000/api/stats/update/${user}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: result.liked ? "likeCount" : "unlikeCount",
          }),
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
      fetch(`http://localhost:8000/posts/${post.postId}/comments`)
        .then((response) => response.json())
        .then((data: Comment[]) => setComments(data))
        .catch(console.error);
    }
  }, [showComments, post.postId]);

  const handleCommentSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newComment.trim()) {
      alert("Please enter a comment.");
      return;
    }

    console.log("Post ID:", post.postId, "Comment:", newComment);
    const apiUrl = `http://localhost:8000/posts/${post.postId}/comments`;

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

        await fetch(`http://localhost:8000/api/stats/update/${user}`, {
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

  console.log("USER", post.userId);

  return (
    <div
      style={{
        marginBottom: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "15px",
        backgroundColor: "#d2b48c",
        // color: "#6A1B9A",
        fontSize: "25px",
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
          src={"/uploads/" + post?.profilePictureUrl}
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
          to={`/user/${post.userId}`}
          style={{ color: "#000", textDecoration: "none" }}
        >
          <strong>{post.username}</strong>
        </Link>
        <span style={{ marginLeft: "auto", color: "#000" }}>
          {moment(post.createTime).format("MMMM D, YYYY h:mm a")}
          {/* {post.create_time} */}
        </span>
      </div>
      {/* Post Content */}
      <p style={{ marginBottom: "10px" }}>{post.content}</p>
      {post.imageUrl && (
        <img
          // src={post.image_url}
          src={`../uploads/${post?.imageUrl}`}
          alt="Post"
          style={{
            width: "50%",
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
          color: "#000",
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
          <FontAwesomeIcon
            icon={liked ? faHeartFull : faHeartEmpty}
            style={{ color: liked ? "red" : "#4A148C" }}
          />
          {liked ? " Unlike" : " Like"}
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
              key={comment.commentId}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between", // Ensure space between elements
                backgroundColor: "#EADDCA",
                borderRadius: "8px",
                padding: "10px",
                margin: "10px 0",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={"/uploads/" + comment?.profilePictureUrl}
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
                      to={`/user/${comment.userId}`}
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
