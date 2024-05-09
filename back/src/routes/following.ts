import express from "express";
import db from "../config/db";

const router = express.Router();

router.get("/:userId", (req, res) => {
  const userId = req.params.userId;
  db.query(
    "SELECT followedUser FROM friendships WHERE followingUser = ?",
    [userId],
    (error, results) => {
      if (error) return res.status(500).send(error);
      res.json(results);
    }
  );
});

export default router;
