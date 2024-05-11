import express, { Router } from "express";
import login from "./login";
import pet from "./pet";
import items from "./items";
import friends from "./friends";
import myLevel from "./level";

// Zubayer's routes
// import register from "./register";
import users from "./users";
import friendship from "./friendship";
import comments from "./comments";
import stats from "./stats";
import likes from "./likes";
import posts from "./posts";
import profile from "./profile";
import following from "./following";
import followers from "./followers";
import all_users from "./all_users";
import history from "./user-posts";
// to organize as different usage, router used
export const router: Router = express.Router();

router.use("/", login);
router.use("/", pet);
router.use("/", items);
router.use("/", friends);
router.use("/", myLevel);
// router.use("/register", register);
router.use("/api/user", users);
router.use("/posts", posts);
router.use("/friendships", friendship);
router.use("/posts/:postId/comments", comments);
router.use("/api/stats", stats);
router.use("/posts/:postId/like", likes);
router.use("/updateProfile", profile);
router.use("/following", following);
router.use("/followers", followers);
router.use("/users", all_users);
router.use("/user-posts", history);

export default router;
