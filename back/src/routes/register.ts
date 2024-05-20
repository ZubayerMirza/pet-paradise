// Never used
// Outdated. We use Goni's login.ts for both login and registration

import express, { Request, Response } from "express";
import db from "../config/db";

const router = express.Router();

interface RegisterParams {
  username: string;
  password: string;
  email?: string;
}

router.post("/", (req: Request, res: Response) => {
  const { username, password, email } = req.body as RegisterParams;

  const insertUserQuery =
    "INSERT INTO users (username, password, email) VALUES (?, ?, ?)";
  db.query(insertUserQuery, [username, password, email], (err, result) => {
    if (err) {
      console.error("Error registering user:", err);
      return res
        .status(500)
        .json({ message: "Server error during registration" });
    }

    const userId = result.insertId;
    const initStatsQuery = "INSERT INTO user_stats (userId) VALUES (?)";
    db.query(initStatsQuery, [userId], (err, result) => {
      if (err) {
        console.error("Error initializing user stats:", err);
        return res
          .status(500)
          .json({ message: "Server error initializing user stats" });
      }

      res
        .status(201)
        .json({ message: "User registered successfully", userId: userId });
    });
  });
});

export default router;
