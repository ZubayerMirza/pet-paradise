import express from "express";
import db from "../config/db";

const router = express.Router();

// Route to fetch a user's details
router.get("/:userId", (req, res) => {
  const { userId } = req.params;

  const query = `
    SELECT user_id, name, email, location, gender, age, interests, bio, school, cover_picture, profile_picture_url 
    FROM users 
    WHERE user_id = ?
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching user data:", err);
      // Debug: Log database error
      console.log("Database error details:", err.message);
      return res.status(500).json({ error: "Internal server error" });
    }

    // Check if user data was found
    if (results.length > 0) {
      res.json(results[0]);
    } else {
      console.log("User not found for userId:", userId);
      res.status(404).json({ error: "User not found" });
    }
  });
});

export default router;
