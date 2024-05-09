import { DataTypes } from "sequelize";
import data from "../../config/dbconnect";

const Post = data.define(
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
  },
  {
    tableName: "posts",
    timestamps: false, // Ensures Sequelize manages createdAt and updatedAt
  }
);

export default Post;
