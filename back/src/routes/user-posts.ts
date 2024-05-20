import express from "express";
import db from "../config/db";

const router = express.Router();

// Route to get posts by a specific user
router.get("/:userId", (req, res) => {
  const userId = req.params.userId;
  // Get all the contents needed to display the posts
  const query = `
        SELECT 
            Posts.postId, 
            Posts.userId,
            Posts.content, 
            Posts.imageUrl, 
            Posts.createdAt, 
            Users.username, 
            Users.profilePictureUrl
        FROM Posts
        JOIN Users ON Posts.userId = Users.id
        WHERE Posts.userId = ?
        ORDER BY Posts.postId DESC
    `;

  db.query(query, [userId], (err, rows) => {
    if (err) {
      console.error("Error fetching user's posts:", err);
      return res
        .status(500)
        .json({ message: "Error fetching user's posts", error: err.message });
    }

    res.json(rows);
  });
});

export default router;
