// Route to get all the users

import express, { Request, Response } from "express";
import db from "../config/db";

const router = express.Router();
// Endpoint from api.ts
router.get("/", (req, res) => {
  // Return the user information for all users in users table
  db.query(
    "SELECT id, username, name, age, profilePictureUrl FROM users",
    (error, results) => {
      if (error) throw error;
      res.json(results);
    }
  );
});

export default router;
