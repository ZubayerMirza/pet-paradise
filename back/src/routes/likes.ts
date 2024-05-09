import express, { Request, Response } from "express";
import db from "../config/db";

interface LikeParams {
  postId: string;
}

const router = express.Router({ mergeParams: true });

// Toggle like status on a post using POST method
router.post("/", (req: Request<LikeParams>, res: Response) => {
  const { postId } = req.params;
  const { userId } = req.body; // Make sure you are sending `userId` in the body of your POST request

  // Check if the like already exists
  const checkLikeQuery = "SELECT * FROM Likes WHERE postId = ? AND userId = ?";
  db.query(checkLikeQuery, [postId, userId], (err, likes) => {
    if (err) {
      console.error("Error checking like status:", err);
      return res.status(500).send("Error toggling like");
    }

    if (likes.length > 0) {
      // Like exists, remove it
      const deleteLikeQuery =
        "DELETE FROM Likes WHERE postId = ? AND userId = ?";
      db.query(deleteLikeQuery, [postId, userId], (err, result) => {
        if (err) {
          console.error("Error deleting like:", err);
          return res.status(500).send("Error toggling like");
        }
        res.json({ liked: false });
      });
    } else {
      // Like does not exist, add it
      const insertLikeQuery =
        "INSERT INTO Likes (postId, userId) VALUES (?, ?)";
      db.query(insertLikeQuery, [postId, userId], (err, result) => {
        if (err) {
          console.error("Error inserting like:", err);
          return res.status(500).send("Error toggling like");
        }
        res.json({ liked: true });
      });
    }
  });
});

export default router;
