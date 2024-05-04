import express, { Request, Response } from "express";
import db from "../config/db";

const router = express.Router();

interface RegisterParams {
  username: string;
  password: string;
  email?: string;
}

// Route to handle user registration
router.post("/register", (req: Request, res: Response) => {
  const { username, password, email } = req.body as RegisterParams;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  // Check if username already exists
  const checkUserQuery = "SELECT username FROM users WHERE username = ?";
  db.query(checkUserQuery, [username], (err, users) => {
    if (err) {
      console.error("Error checking username:", err);
      return res
        .status(500)
        .json({
          message: "Server error during registration",
          error: err.message,
        });
    }

    if (users.length > 0) {
      return res.status(409).json({ message: "Username already exists" });
    }

    // Insert new user if username is not taken
    const insertUserQuery =
      "INSERT INTO users (username, password_hash, email) VALUES (?, ?, ?)";
    // In a real application, make sure to hash the password before storing it
    db.query(insertUserQuery, [username, password, email], (err, result) => {
      if (err) {
        console.error("Error registering user:", err);
        return res
          .status(500)
          .json({
            message: "Server error during registration",
            error: err.message,
          });
      }

      res
        .status(201)
        .json({
          message: "User registered successfully",
          userId: result.insertId,
        });
    });
  });
});

export default router;
