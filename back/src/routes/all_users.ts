// Route to get all the users

import express, { Request, Response } from "express";
import db from "../config/db";

const router = express.Router();

router.get("/", (req, res) => {
  db.query(
    "SELECT id, username, name, age, profilePictureUrl FROM users",
    (error, results) => {
      if (error) throw error;
      res.json(results);
    }
  );
});

export default router;
