import express from "express";
import db from "../config/db";
const router = express.Router();

// Get the leaderboard data
router.get("/", (req, res) => {
  // Return the id, username, wins by joining with the users table
  const sqlQuery =
    "SELECT u.id, u.username, u.name, u.age, u.profilePictureUrl, l.wins FROM users u JOIN leaderboard l ON u.id = l.id ORDER BY l.wins DESC";
  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.error("Failed to retrieve leaderboard data:", err);
      res.status(500).send("Error fetching leaderboard data");
    } else {
      res.json(results);
    }
  });
});

// Change the wins of a user in leaderboard table
router.post("/:userId", (req, res) => {
  const userId = req.params.userId;
  // Add point to the score for the winner
  const sql = "UPDATE leaderboard SET wins = wins + 1 WHERE id = ?";

  db.query(sql, [userId], (error, results) => {
    if (error) {
      console.error("Error updating leaderboard:", error);
      res.status(500).send("Error updating leaderboard");
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).send("User not found");
      return;
    }
    res.status(200).send("Wins updated successfully");
  });
});

export default router;
