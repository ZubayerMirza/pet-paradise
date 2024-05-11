import express, { Request, Response } from "express";
import multer from "multer";
import db from "../config/db"; // Make sure db is properly set up
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "../../../front/public/uploads");
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
const multipleUpload = upload.fields([
  { name: "profile_picture", maxCount: 1 },
  { name: "cover_picture", maxCount: 1 },
]);

// Update profile route
router.put("/", multipleUpload, (req: any, res: any) => {
  const { id, name, location, gender, age, interests, bio, school } = req.body;

  // Access uploaded files (if any)
  const profilePictureFile = req.files?.profile_picture?.[0];
  const coverPictureFile = req.files?.cover_picture?.[0];

  let profilePictureUrl = profilePictureFile
    ? `${profilePictureFile.filename}`
    : null;
  let coverPictureUrl = coverPictureFile
    ? `${coverPictureFile.filename}`
    : null;

  if (!id) {
    return res.status(400).send({ message: "User ID is required" });
  }

  const updateQuery = `
    UPDATE users
    SET
      name = ?,
      location = ?,
      gender = ?,
      age = ?,
      interests = ?,
      bio = ?,
      school = ?,
      coverPicture = ?,
      profilePictureUrl = ?
    WHERE
      id = ?;
  `;

  const queryParams = [
    name,
    location,
    gender,
    age,
    interests,
    bio,
    school,
    coverPictureUrl,
    profilePictureUrl,
    id,
  ];

  db.query(updateQuery, queryParams, (error, results) => {
    if (error) {
      console.error("Failed to update profile:", error);
      return res
        .status(500)
        .send({ message: "Error updating profile", error: error });
    }
    res.status(200).send({ message: "Profile updated successfully" });
  });
});

export default router;
