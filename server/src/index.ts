import express from "express";
import cors from "cors";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
import multer from "multer";
import path from "path";
import router from "./routes/api";
import db from "./config/db"; // Make sure db is properly set up

import { RowDataPacket, ResultSetHeader } from "mysql2";

const app = express();
const port = 3010;

// Multer for image storage
// Ensure the path correctly points from the server directory to the client uploads directory
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Assuming your server files are in `server/src`, adjust path as necessary
    const uploadPath = path.join(
      __dirname,
      "../../../client/my-social-media-app/src/uploads"
    );
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Ensure filenames are unique to avoid conflicts
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  if (file) {
    res.status(200).json(file.filename);
  } else {
    res.status(400).json({ error: "No file uploaded" });
  }
});

const jwtSecret = "secret_key";

// CORS implementation
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || origin === "http://localhost:3000") {
        // Allow requests with no origin
        // (like mobile apps or curl requests)
        callback(null, true);
      } else {
        // You can also include a specific list of origins
        callback(new Error("CORS not allowed"), false);
      }
    },
    credentials: true,
  })
);

// Express Server
app.use(express.json());

app.use("/", router);

// Registration endpoint
// Store username, email and password to the database if the username and email don't exist
// app.post("/register", async (req, res) => {
//   const { username, email, password } = req.body;

//   try {
//     // Check if username or email already exists
//     const [users] = await db.query<RowDataPacket[]>(
//       "SELECT * FROM users WHERE username = ? OR email = ?",
//       [username, email]
//     );

//     if (users.length > 0) {
//       return res
//         .status(409)
//         .send({ message: "Username or email already exists" });
//     }

//     // Insert new user
//     const [userResult] = await db.query<ResultSetHeader>(
//       "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)",
//       [username, email, password]
//     );

//     // `userResult` is the first element of the array which includes the result object containing `insertId`
//     const userId = userResult.insertId;

//     // Initialize user stats
//     await db.query(
//       "INSERT INTO user_stats (id, postCount, commentCount, likeCount, friendCount, shareCount) VALUES (?, 0, 0, 0, 0, 0)",
//       [userId]
//     );

//     res.status(201).send({ message: "User registered successfully" });
//   } catch (error) {
//     res.status(500).send({ message: "Error registering user", error: error });
//   }
// });

// Login backend: Check if the username and password exist
// Also store the username and id in the response for a later token
// app.post("/login", async (req: any, res: any) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res
//       .status(400)
//       .json({ message: "Username and password are required" });
//   }

//   try {
//     const [rows] = await db.query<RowDataPacket[]>(
//       "SELECT id, username, name, profile_picture_url FROM users WHERE username = ? AND password_hash = ?",
//       [username, password]
//     );

//     if (rows.length === 0) {
//       return res
//         .status(401)
//         .json({ message: "Incorrect username or password" });
//     }

//     // If the user is found.
//     res.json({
//       username: username,
//       message: "Login successful",
//       user: rows[0].id,
//       name: rows[0].name,
//       profile_picture: rows[0].profile_picture_url,
//     });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ message: "Server error during login" });
//   }
// });

// Get all the posts
// app.get("/posts", async (req, res) => {
//   try {
//     const [rows] = await db.query(`
//       SELECT
//         Posts.post_id,
//         Posts.content,
//         Posts.image_url,
//         Posts.create_time,
//         Users.username,
//         Users.profile_picture_url
//       FROM Posts
//       JOIN Users ON Posts.id = Users.id
//       ORDER BY Posts.create_time DESC
//     `);
//     res.json(rows);
//   } catch (error) {
//     if (error instanceof Error) {
//       res
//         .status(500)
//         .json({ message: "Error fetching posts", error: error.message });
//     } else {
//       res.status(500).json({ message: "Unknown error occurred" });
//     }
//   }
// });

// Upload to the posts table including an image
// app.post("/posts", upload.single("image"), async (req, res) => {
//   const { id, content } = req.body;
//   const file = req.file;

//   // Validate id and content
//   if (!id) {
//     return res.status(400).json({ message: "id is required" });
//   }
//   if (!content) {
//     return res.status(400).json({ message: "Content is required" });
//   }

//   let image_url = null;
//   if (file) {
//     image_url = `/uploads/${file.filename}`; // Assuming your server serves static files from 'uploads'
//   }

//   try {
//     const insertQuery =
//       "INSERT INTO Posts (id, content, image_url) VALUES (?, ?, ?)";
//     const values = [id, content, image_url];
//     const [result] = await db.query<ResultSetHeader>(insertQuery, values);

//     if (result.insertId) {
//       const [posts] = await db.query<RowDataPacket[]>(
//         "SELECT Posts.*, Users.username, Users.profile_picture_url FROM Posts JOIN Users ON Posts.id = Users.id WHERE Posts.post_id = ?",
//         [result.insertId]
//       );

//       if (posts.length) {
//         const newPost = posts[0]; // There should only be one post with this ID
//         res.status(201).json(newPost);
//       } else {
//         throw new Error("Post not found after insertion");
//       }
//     } else {
//       throw new Error("Insert failed, no ID returned");
//     }
//   } catch (error) {
//     console.error("Error handling /posts route:", error);
//     res.status(500).json({ message: "Server error", error: error });
//   }
// });

// Get the comments
// app.get("/posts/:postId/comments", async (req, res) => {
//   const { postId } = req.params;

//   try {
//     const [comments] = await db.query(
//       `
//       SELECT Comments.*, Users.username, Users.profile_picture_url
//       FROM Comments
//       JOIN Users ON Comments.id = Users.id
//       WHERE Comments.post_id = ?
//       ORDER BY Comments.create_time DESC
//     `,
//       [postId]
//     );

//     res.json(comments);
//   } catch (error) {
//     console.error("Error fetching comments:", error);
//     res.status(500).json({ message: "Error fetching comments" });
//   }
// });

// // Make comments
// app.post("/posts/:postId/comments", async (req, res) => {
//   const { postId } = req.params;
//   const { userId, content } = req.body;

//   if (!content) {
//     return res.status(400).json({ message: "Comment content is required" });
//   }

//   try {
//     const [result] = await db.query<ResultSetHeader>(
//       "INSERT INTO Comments (post_id, id, content) VALUES (?, ?, ?)",
//       [postId, userId, content]
//     );

//     if (result.insertId) {
//       const [newComment] = await db.query<RowDataPacket[]>(
//         `
//         SELECT Comments.*, Users.username, Users.profile_picture_url
//         FROM Comments
//         JOIN Users ON Comments.id = Users.id
//         WHERE Comments.comment_id = ?
//       `,
//         [result.insertId]
//       );

//       res.status(201).json(newComment[0]);
//     } else {
//       throw new Error("Failed to add comment");
//     }
//   } catch (error) {
//     console.error("Error posting comment:", error);
//     res.status(500).json({ message: "Error posting comment" });
//   }
// });

// Like posts
// app.post("/posts/:postId/like", async (req, res) => {
//   const { postId } = req.params;
//   const { userId } = req.body;

//   try {
//     const [like] = await db.query<RowDataPacket[]>(
//       "SELECT * FROM Likes WHERE post_id = ? AND id = ?",
//       [postId, userId]
//     );

//     if (like.length) {
//       await db.query("DELETE FROM Likes WHERE post_id = ? AND id = ?", [
//         postId,
//         userId,
//       ]);
//       res.json({ liked: false });
//     } else {
//       await db.query("INSERT INTO Likes (post_id, id) VALUES (?, ?)", [
//         postId,
//         userId,
//       ]);
//       res.json({ liked: true });
//     }
//   } catch (error) {
//     console.error("Error toggling like:", error);
//     res.status(500).send("Error toggling like");
//   }
// });

// Handling multiple fields with for profile picture and cover picture
// const multipleUpload = upload.fields([
//   { name: "profile_picture", maxCount: 1 },
//   { name: "cover_picture", maxCount: 1 },
// ]);

// app.put("/updateProfile", multipleUpload, async (req: any, res: any) => {
//   const { id, name, location, gender, age, interests, bio, school } =
//     req.body;

//   // Access uploaded files (if any)
//   const profilePictureFile = req.files?.profile_picture?.[0];

//   const coverPictureFile = req.files?.cover_picture?.[0];

//   let profilePictureUrl = null;
//   let coverPictureUrl = null;

//   // Generate URLs based on stored file paths (optional)
//   if (profilePictureFile) {
//     profilePictureUrl = `${profilePictureFile.filename}`;
//   }

//   if (coverPictureFile) {
//     coverPictureUrl = `${coverPictureFile.filename}`;
//   }

//   if (!id) {
//     return res.status(400).send({ message: "User ID is required" });
//   }

//   const updateQuery = `
//     UPDATE users
//     SET
//       name = ?,
//       location = ?,
//       gender = ?,
//       age = ?,
//       interests = ?,
//       bio = ?,
//       school = ?,
//       cover_picture = ?,
//       profile_picture_url = ?
//     WHERE
//       id = ?;
//   `;

//   try {
//     await db.query(updateQuery, [
//       name,
//       location,
//       gender,
//       age,
//       interests,
//       bio,
//       school,
//       coverPictureUrl,
//       profilePictureUrl,
//       id,
//     ]);
//     res.status(200).send({ message: "Profile updated successfully" });
//   } catch (error) {
//     console.error("Failed to update profile:", error);
//     res.status(500).send({ message: "Error updating profile", error: error });
//   }
// });

// app.get("/api/user/:userId", async (req, res) => {
//   const { userId } = req.params;

//   try {
//     // Query the database to fetch user data
//     const userData = await db.query(
//       "SELECT id, name, email, location, gender, age, interests, bio, school, cover_picture, profile_picture_url FROM users WHERE id = ?",
//       [userId]
//     );

//     // Check if user data was found
//     if (userData.length > 0) {
//       res.json(userData[0]);
//     } else {
//       console.log("User not found for userId:", userId);
//       res.status(404).json({ error: "User not found" });
//     }
//   } catch (error) {
//     console.error("Error fetching user data:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// Create a new friendship
// app.post("/friendships", async (req, res) => {
//   const { followedUser, followingUser } = req.body;
//   try {
//     const sql =
//       "INSERT INTO friendships (followedUser, followingUser, status) VALUES (?, ?, ?)";
//     const status = "active";
//     await db.query(sql, [followedUser, followingUser, status]);
//     res.status(201).send({ message: "Followed successfully" });
//   } catch (error) {
//     res.status(500).send({ message: "Error following user", error: error });
//   }
// });

// Delete a friendship
// app.delete("/friendships", async (req, res) => {
//   const { followedUser, followingUser } = req.body;
//   try {
//     const sql =
//       "DELETE FROM friendships WHERE followedUser = ? AND followingUser = ?";
//     await db.query(sql, [followedUser, followingUser]);
//     res.status(200).send({ message: "Unfollowed successfully" });
//   } catch (error) {
//     res.status(500).send({ message: "Error unfollowing user", error: error });
//   }
// });

// // Get friendship status
// app.get("/friendships", async (req, res) => {
//   const { followedUser, followingUser } = req.query;
//   try {
//     const sql =
//       "SELECT * FROM friendships WHERE followedUser = ? AND followingUser = ?";
//     const [rows] = await db.query<RowDataPacket[]>(sql, [
//       followedUser,
//       followingUser,
//     ]);
//     if (rows.length > 0) {
//       res.status(200).json(rows[0]);
//     } else {
//       res.status(404).send({ message: "No friendship found" });
//     }
//   } catch (error) {
//     res.status(500).send({
//       message: "Error retrieving friendship status",
//       error: error,
//     });
//   }
// });

// // Endpoint to get user stats
// app.get("/api/stats/:userId", async (req, res) => {
//   const { userId } = req.params;
//   try {
//     const [rows] = await db.query<RowDataPacket[]>(
//       "SELECT * FROM user_stats WHERE id = ?",
//       [userId]
//     );
//     if (rows.length === 0) {
//       res.status(404).send("User not found");
//       return;
//     }
//     res.json(rows[0]);
//   } catch (err) {
//     res.status(500).send("Database error");
//     console.error(err);
//   }
// });

// Endpoint to update stats
// app.post("/api/update/:userId", async (req, res) => {
//   const { userId } = req.params;
//   const { action } = req.body;
//   const validActions = [
//     "postCount",
//     "commentCount",
//     "likeCount",
//     "friendCount",
//     "shareCount",
//   ];
//   if (!validActions.includes(action)) {
//     res.status(400).send("Invalid action");
//     return;
//   }

//   try {
//     const query = `UPDATE user_stats SET ${action} = ${action} + 1 WHERE id = ?`;
//     const [result] = await db.query<ResultSetHeader>(query, [userId]);
//     if (result.affectedRows === 0) {
//       res.status(404).send("User not found");
//       return;
//     }
//     res.send("Update successful");
//   } catch (err) {
//     res.status(500).send("Database error");
//     console.error(err);
//   }
// });

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
