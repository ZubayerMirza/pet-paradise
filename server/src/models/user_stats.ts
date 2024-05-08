import { DataTypes } from "sequelize";
import sequelize from "../config/dbconnect";
import User from "./users";

const UserStats = sequelize.define(
  "UserStats",
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: "users", // name of the Users table
        key: "userId",
      },
    },
    postCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    commentCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    likeCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    friendCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    shareCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: "user_stats",
    timestamps: false,
  }
);

// Relationship
User.hasOne(UserStats, { foreignKey: "userId" });
UserStats.belongsTo(User, { foreignKey: "userId" });

export default UserStats;
