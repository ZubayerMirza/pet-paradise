import express from "express";
import multer from "multer";
import db from "../config/db";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import path from "path";

const router = express.Router();

// Multer for image storage
// Ensure the path correctly points from the server directory to the client uploads directory
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Assuming your server files are in `server/src`, adjust path as necessary
    const uploadPath = path.join(
      __dirname,
      "../../../client/my-social-media-app/public/uploads"
    );
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Ensure filenames are unique to avoid conflicts
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Upload to the posts table including an image
router.post("/", upload.single("image"), (req, res) => {
  const { user_id, content } = req.body;
  const file = req.file;

  // Validate user_id and content
  if (!user_id) {
    return res.status(400).json({ message: "user_id is required" });
  }
  if (!content) {
    return res.status(400).json({ message: "Content is required" });
  }

  let image_url = null;
  if (file) {
    image_url = `${file.filename}`; // Assuming your server serves static files from 'uploads'
  }

  const insertQuery =
    "INSERT INTO Posts (user_id, content, image_url) VALUES (?, ?, ?)";
  const values = [user_id, content, image_url];

  db.query(insertQuery, values, (err, result) => {
    if (err) {
      console.error("Error during insertion:", err);
      return res.status(500).json({ message: "Server error", error: err });
    }

    if (!result.insertId) {
      return res.status(500).json({ message: "Insert failed, no ID returned" });
    }

    const selectQuery =
      "SELECT Posts.*, Users.username, Users.profile_picture_url FROM Posts JOIN Users ON Posts.user_id = Users.user_id WHERE Posts.post_id = ?";
    db.query(selectQuery, [result.insertId], (err, posts) => {
      if (err) {
        console.error("Error retrieving post after insertion:", err);
        return res.status(500).json({ message: "Server error", error: err });
      }

      if (posts.length) {
        const newPost = posts[0]; // There should only be one post with this ID
        res.status(201).json(newPost);
      } else {
        res.status(404).json({ message: "Post not found after insertion" });
      }
    });
  });
});

// Fetch all posts
router.get("/", (req, res) => {
  const query = `
      SELECT 
          Posts.post_id, 
          Posts.content, 
          Posts.image_url, 
          Posts.create_time, 
          Users.username, 
          Users.profile_picture_url
      FROM Posts
      JOIN Users ON Posts.user_id = Users.user_id
      ORDER BY Posts.create_time DESC
  `;

  db.query(query, (err, rows) => {
    if (err) {
      console.error("Error fetching posts:", err);
      return res
        .status(500)
        .json({ message: "Error fetching posts", error: err.message });
    }

    res.json(rows);
  });
});

export default router;
