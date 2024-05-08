import { sequelize } from "../config/dbconnect";
import User from "./users";
import Post from "./posts";
import Comment from "./comments";
import Like from "./likes";
import Friendship from "./friendships";
import UserStats from "./user_stats";

User.hasOne(UserStats, { foreignKey: "userId" });
UserStats.belongsTo(User, { foreignKey: "userId" });

Like.belongsTo(User, { foreignKey: "userId" });
Like.belongsTo(Post, { foreignKey: "postId" });

Friendship.belongsTo(User, { foreignKey: "followedUser" });
Friendship.belongsTo(User, { foreignKey: "followingUser" });

Comment.belongsTo(User, { foreignKey: "userId" });
Comment.belongsTo(Post, { foreignKey: "postId" });

User.hasMany(Post, { foreignKey: "userId" });
Post.belongsTo(User, { foreignKey: "userId" });

export { User, Post, Comment, Like, Friendship, UserStats };
