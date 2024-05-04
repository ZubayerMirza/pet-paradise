import express from "express";
import db from "../config/db";

const router = express.Router();

// Route to handle user login
router.post("/", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  // It's important to hash passwords in production applications. This example uses plain text for simplicity.
  const query =
    "SELECT user_id, username, name FROM users WHERE username = ? AND password_hash = ?";
  db.query(query, [username, password], (err, rows) => {
    if (err) {
      console.error("Login error:", err);
      return res
        .status(500)
        .json({ message: "Server error during login", error: err.message });
    }

    if (rows.length === 0) {
      return res
        .status(401)
        .json({ message: "Incorrect username or password" });
    }

    // If the user is found.
    const user = rows[0];
    res.json({
      username: user.username,
      message: "Login successful",
      user: user.user_id,
      name: user.name,
    });
  });
});

export default router;
