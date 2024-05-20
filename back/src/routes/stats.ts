import express from "express";
import db from "../config/db";

const router = express.Router();

// Endpoint to get user stats based on the id
router.get("/:userId", (req, res) => {
  const { userId } = req.params;
  // Get all the data like postCount, commentCount, etc based on id
  const query = "SELECT * FROM user_stats WHERE userId = ?";
  db.query(query, [userId], (err, rows) => {
    if (err) {
      console.error("Database error:", err);
      res.status(500).send("Database error");
      return;
    }
    if (rows.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.json(rows[0]);
    }
  });
});

// Endpoint to update stats
router.post("/update/:userId", (req, res) => {
  const { userId } = req.params;
  const { action } = req.body;
  const validActions = [
    "postCount",
    "commentCount",
    "likeCount",
    "friendCount",
    "shareCount",
  ];

  if (!validActions.includes(action)) {
    return res.status(400).send("Invalid action");
  }

  // Whenever user posts or does any action, the count is incremented by 1
  const query = `UPDATE user_stats SET ${action} = ${action} + 1 WHERE userId = ?`;
  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send("Database error");
    }
    res.send("Update successful");
  });
});

export default router;
