import express, { Request, Response } from "express";
import db from "../config/db";

// Define an interface to describe the expected request parameters
interface CommentParams {
  postId: string;
}

const router = express.Router({ mergeParams: true });

// Get comments for a post
router.get("/", (req: Request<CommentParams>, res: Response) => {
  const { postId } = req.params;
  const query = `
    SELECT Comments.*, Users.username, Users.profile_picture_url
    FROM Comments
    JOIN Users ON Comments.user_id = Users.user_id
    WHERE Comments.post_id = ?
    ORDER BY Comments.create_time DESC
  `;

  db.query(query, [postId], (err, comments) => {
    if (err) {
      console.error("Error fetching comments:", err);
      return res
        .status(500)
        .json({ message: "Error fetching comments", error: err.message });
    }

    res.json(comments);
  });
});

// Post a new comment on a post
router.post("/", (req: Request<CommentParams>, res: Response) => {
  const { postId } = req.params;
  const { userId, content } = req.body;

  if (!content) {
    return res.status(400).json({ message: "Comment content is required" });
  }

  const insertQuery =
    "INSERT INTO Comments (post_id, user_id, content) VALUES (?, ?, ?)";
  db.query(insertQuery, [postId, userId, content], (err, result) => {
    if (err) {
      console.error("Error posting comment:", err);
      return res
        .status(500)
        .json({ message: "Error posting comment", error: err.message });
    }

    if (!result.insertId) {
      return res.status(500).json({ message: "Failed to add comment" });
    }

    const selectQuery = `
      SELECT Comments.*, Users.username, Users.profile_picture_url
      FROM Comments
      JOIN Users ON Comments.user_id = Users.user_id
      WHERE Comments.comment_id = ?
    `;
    db.query(selectQuery, [result.insertId], (err, newComment) => {
      if (err) {
        console.error("Error fetching new comment:", err);
        return res
          .status(500)
          .json({ message: "Error fetching new comment", error: err.message });
      }

      res.status(201).json(newComment[0]);
    });
  });
});

export default router;
