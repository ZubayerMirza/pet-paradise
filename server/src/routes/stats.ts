import express from "express";
import db from "../config/db";

const router = express.Router();

// Endpoint to get user stats
router.get("/:userId", (req, res) => {
  const { userId } = req.params;
  const query = "SELECT * FROM user_stats WHERE user_id = ?";
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

  const query = `UPDATE user_stats SET ${action} = ${action} + 1 WHERE user_id = ?`;
  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send("Database error");
    }
    res.send("Update successful");
  });
});

export default router;
