import express from "express";
import db from "../config/db";
const router = express.Router();

// Create a new friendship
router.post("/", (req, res) => {
  const { followedUser, followingUser } = req.body;
  // Insert into the friendship table the values
  const sql =
    "INSERT INTO friendships (followedUser, followingUser, status) VALUES (?, ?, ?)";
  const status = "active";

  db.query(sql, [followedUser, followingUser, status], (err, result) => {
    if (err) {
      console.error("Error following user:", err);
      return res
        .status(500)
        .send({ message: "Error following user", error: err.message });
    }
    res.status(201).send({ message: "Followed successfully" });
  });
});

// Delete a friendship
router.delete("/", (req, res) => {
  const { followedUser, followingUser } = req.body;
  const sql =
    "DELETE FROM friendships WHERE followedUser = ? AND followingUser = ?";

  db.query(sql, [followedUser, followingUser], (err, result) => {
    if (err) {
      console.error("Error unfollowing user:", err);
      return res
        .status(500)
        .send({ message: "Error unfollowing user", error: err.message });
    }
    res.status(200).send({ message: "Unfollowed successfully" });
  });
});

// Get friendship status
router.get("/", (req, res) => {
  const { followedUser, followingUser } = req.query;
  // Endpoint to get the id of the follower and following
  const sql =
    "SELECT * FROM friendships WHERE followedUser = ? AND followingUser = ?";

  db.query(sql, [followedUser, followingUser], (err, results) => {
    if (err) {
      console.error("Error retrieving friendship status:", err);
      return res.status(500).send({
        message: "Error retrieving friendship status",
        error: err.message,
      });
    }
    if (results.length > 0) {
      res.status(200).json(results[0]);
    } else {
      res.status(404).send({ message: "No friendship found" });
    }
  });
});

export default router;
