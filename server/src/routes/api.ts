import express, { Router } from "express";
import login from "./login";
import register from "./register";
import users from "./users";
import friends from "./friendship";
import comments from "./comments";
import stats from "./stats";
import likes from "./likes";
import posts from "./posts";
import profile from "./profile";
import following from "./following";
import followers from "./followers";
import all_users from "./all_users";

// to organize as different usage, router used
export const router: Router = express.Router();

router.use("/login", login);
router.use("/register", register);
router.use("/api/user", users);
router.use("/posts", posts);
router.use("/friendships", friends);
router.use("/posts/:postId/comments", comments);
router.use("/api/stats", stats);
router.use("/posts/:postId/like", likes);
router.use("/updateProfile", profile);
router.use("/following", following);
router.use("/followers", followers);
router.use("/users", all_users);

export default router;
