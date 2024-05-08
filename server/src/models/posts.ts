import { DataTypes } from "sequelize";
import sequelize from "../config/dbconnect";
import User from "./users";

const Post = sequelize.define(
  "Post",
  {
    postId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: DataTypes.TEXT,
    imageUrl: DataTypes.STRING,
    createTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "posts",
    timestamps: false,
  }
);

// Define relationships
User.hasMany(Post, { foreignKey: "userId" });
Post.belongsTo(User, { foreignKey: "userId" });

export default Post;
